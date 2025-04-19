import { z } from 'zod';
import { prisma } from '../../prisma/prismaClient';
import { publicProcedure } from '../middleware';
import { trpc } from '../trpc';

export const artistRouter = trpc.router({
    get: publicProcedure.input(
        z.object({
            searchQuery: z.string(),
        })
    ).query(async (ctx) => {
        const { searchQuery } = ctx.input;

        const artists = await prisma.artist.findMany({
            where: {
                name: {
                    contains: searchQuery,
                    mode: 'insensitive',
                },
            },
            orderBy: {
                name: 'asc',
            },
            take: 10,
        })
        return artists
    }),
})