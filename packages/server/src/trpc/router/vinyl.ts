import { Condition } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../../prisma/prismaClient';
import { protectedProcedure } from '../middleware';
import { trpc } from '../trpc';

export const vinylRouter = trpc.router({
    get: protectedProcedure.input(
        z.object({
            page: z.number().optional(),
        })
    )
    .query(async ({ ctx, input }) => {
        const { user } = ctx
        const { page: pageInput } = input

        const pageSize = 12

        const baseQueryParam = {
            where: {
                userId: user.id,
            }
        }

        const extendedQueryParam = {
            where: {
                userId: user.id,
            },
            orderBy: {
                createdAt: 'desc' as const,
            },
            include: {
                artist: true,
                genre: true,
                style: true,
            },
            take: pageSize,
            skip: pageInput ? (pageInput - 1) * pageSize : 0,
        }

        const records = await prisma.vinylRecord.findMany(extendedQueryParam)
        const totalRecords = await prisma.vinylRecord.count(baseQueryParam)

        return {
            data: records,
            meta: {
                totalRecords,
                totalPages: Math.ceil(totalRecords / pageSize),
                currentPage: pageInput || 1,
                pageSize,
            }
        }
    }),
    create: protectedProcedure.input(
        z.object({
            title: z.string(),
            year: z.number(),
            genreId: z.string().optional(),
            styleId: z.string().optional(),
            condition: z.nativeEnum(Condition).optional(),
            coverImage: z.string().optional(),
            purchaseDate: z.string().optional(),
            recordColor: z.string().optional(),
            artistId: z.string().optional(),
            notes: z.string().optional(),
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