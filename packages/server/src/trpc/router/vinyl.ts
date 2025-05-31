import { Condition } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../../prisma/prismaClient';
import { protectedProcedure } from '../middleware';
import { trpc } from '../trpc';

export const vinylRouter = trpc.router({
    create: protectedProcedure.input(
        z.object({
            title: z.string(),
            genreId: z.string().optional(),
            styleId: z.string().optional(),
            condition: z.nativeEnum(Condition).optional(),
            purchaseDate: z.string().optional(),
            recordColor: z.string().optional(),
            artistId: z.string().optional(),
        })
    ).mutation(async ({ input, ctx }) => {
        const { user } = ctx

        /* TODO: create tracks in db */

        // const record = await prisma.vinylRecord.create({
        //     data: {
        //         ...input,
        //         userId: user.id,
        //     }
        // })

        // if(!record) {
        //     throw new TRPCError({
        //         code: 'INTERNAL_SERVER_ERROR',
        //         message: 'Failed to create the record.',
        //     });
        // }

        // return record
    }),
})