import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../../prisma/prismaClient';
import { protectedProcedure, publicProcedure } from '../middleware';
import { trpc } from '../trpc';

export const artistRouter = trpc.router({
    get: publicProcedure.input(
        z.object({
            searchQuery: z.string(),
        })
    ).query(async (ctx) => {
        // const { searchQuery } = ctx.input;

        // const artists = await prisma.artist.findMany({
        //     where: {
        //         name: {
        //             contains: searchQuery,
        //             mode: 'insensitive',
        //         },
        //     },
        //     orderBy: {
        //         name: 'asc',
        //     },
        //     take: 10,
        // })
        // return artists
    }),
    create: protectedProcedure.input(
        z.object({
            name: z.string(),
        })
    ).mutation(async ({ input }) => {
        // const artist = await prisma.artist.create({
        //     data: {
        //         name: input.name,
        //     },
        // })

        // if (!artist) {
        //     throw new TRPCError({
        //         code: 'INTERNAL_SERVER_ERROR',
        //         message: 'Failed to create artist in the database.',
        //     });
        // }

        // return {
        //     message: `Artist - ${input.name} created successfully.`,
        // }
    })
})