import { ShareType } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { z } from 'zod';
import { prisma } from '../../prisma/prismaClient';
import { protectedProcedure, publicProcedure } from '../middleware';
import { trpc } from '../trpc';

export const shareLinkRouter = trpc.router({
   get: protectedProcedure.query(async ({ ctx }) => {
        const { user } = ctx;

        const shareLinks = await prisma.collectionShare.findMany({
            where: {
                userId: user.id,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return shareLinks;
    }),
    create: protectedProcedure
        .input(
            z.object({
                shareType: z.nativeEnum(ShareType),
                password: z.string().optional(),
                expiresAt: z.date().optional(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { shareType, password, expiresAt } = input;
            const { user } = ctx;

            const shareToken = randomBytes(16).toString('hex');
            const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

            const shareLink = await prisma.collectionShare.create({
                data: {
                    userId: user.id,
                    shareType,
                    shareToken,
                    password: hashedPassword,
                    expiresAt
                },
            });

            if (!shareLink) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Failed to create share link',
                });
            }

            return { 'shareToken': shareLink.shareToken };
        }),
    delete: protectedProcedure
        .input(
            z.object({
                id: z.string()
            })
        ).mutation(async ({ input, ctx }) => {
            const { id } = input;

            const shareLink = await prisma.collectionShare.findUnique({
                where: {
                    id,
                },
            });

            if (!shareLink) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Requested share link has not been found',
                });
            }

            await prisma.collectionShare.delete({
                where: {
                    id,
                },
            });

            return { message: `share link ${id} has been deleted` };
        }),
    checkToken: publicProcedure
        .input(
            z.object({
                token: z.string(),
            })
    ).query(async ({ input }) => {
            const { token } = input;

            const shareLink = await prisma.collectionShare.findUnique({
                where: {
                    shareToken: token,
                },
            });

            const isExpired = shareLink?.expiresAt ? shareLink.expiresAt < new Date() : false;

            return { 
                isValid: !!shareLink,
                isExpired,
                hasPassword: !!shareLink?.password,
            };
        }),
    getSharedData: publicProcedure
        .input(
            z.object({
                token: z.string(),
                password: z.string().optional()
            })
        ).query(async ({ input }) => {
            const { token, password } = input;

            const shareLink = await prisma.collectionShare.findUnique({
                where: {
                    shareToken: token,
                },
            });

            if (!shareLink) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Requested share link has not been found',
                });
            }

            if (shareLink.password && !password) {
                throw new TRPCError({
                    code: 'UNAUTHORIZED',
                    message: 'Password is required to access this share link',
                });
            }

            if (shareLink.password && password) {
                const isPasswordValid = await bcrypt.compare(password, shareLink.password);

                if (!isPasswordValid) {
                    throw new TRPCError({
                        code: 'UNAUTHORIZED',
                        message: 'Invalid password',
                    });
                }
            }

            const getCollection = () => prisma.vinylRecord.findMany({
                where: {
                    userId: shareLink.userId,
                },
                include: {
                    artist: true,
                    genre: true,
                    style: true,
                }
            })

            const getWishList = () => {
                // TODO: implement wishlist
            }


            let collection = null
            let wishList = null

            switch (shareLink.shareType) {
                case ShareType.collection:
                    collection = await getCollection()
                    break;
                case ShareType.wishlist:
                    wishList = await getWishList()
                    break;
                case ShareType.both:
                    collection = await getCollection()
                    wishList = await getWishList()
                    break;
            }


            return {
                collection,
                wishList,
            };
        })
})