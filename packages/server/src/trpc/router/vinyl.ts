import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../../prisma/prismaClient';
import { protectedProcedure } from '../middleware';
import { trpc } from '../trpc';

export const userRouter = trpc.router({
    get: protectedProcedure.query(async ({ ctx }) => {
        const { user } = ctx

        const records = await prisma.vinylRecord.findMany({
            where: {
                userId: user.id,
            }
        })

        return records
    }),
    create: protectedProcedure.input(
        z.object({
            title: z.string(),
            year: z.number(),
            genre: z.string().optional(),
            style: z.string().optional(),
            condition: z.string().optional(),
            coverImage: z.string().optional(),
            purchaseDate: z.string().optional(),
            recordColor: z.string().optional(),
            artistId: z.string(),
        })
    ).mutation(async ({ input, ctx }) => {
        const { user } = ctx

        /* TODO: create tracks in db */

        const record = await prisma.vinylRecord.create({
            data: {
                ...input,
                userId: user.id,
            }
        })

        if(!record) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to create the record.',
            });
        }

        return record
    }),
    delete: protectedProcedure.input(
        z.object({
            ids: z.array(z.string()),
        })
    ).mutation(async ({ input }) => {
        const records = await prisma.vinylRecord.deleteMany({
            where: {
                id: {
                    in: input.ids,
                }
            }
        })

        return {
            message: `${records.count} records have been deleted successfully`,
        }
    }
    )
})