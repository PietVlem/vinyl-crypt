import { ShareType } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { z } from 'zod';
import { prisma } from '../../prisma/prismaClient';
import { protectedProcedure } from '../middleware';
import { trpc } from '../trpc';

export const shareLinkRouter = trpc.router({
   get: protectedProcedure.query(async (opts) => {
        const { ctx } = opts;
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
                userId: z.string(),
                shareType: z.nativeEnum(ShareType),
                password: z.string().optional(),
            })
        )
        .mutation(async (opts) => {
            const { input } = opts;
            const { userId, shareType, password } = input;

            const shareToken = randomBytes(16).toString('hex');
            const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

            const shareLink = await prisma.collectionShare.create({
                data: {
                    userId,
                    shareType,
                    shareToken,
                    password: hashedPassword,
                },
            });

            if (!shareLink) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Failed to create share link',
                });
            }

            return { 'shareToken': shareLink.shareToken };
        })
})