import { ShareType } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { z } from 'zod';
import { prisma } from '../../prisma/prismaClient';
import { protectedProcedure } from '../middleware';
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
        })
})