import type { PrismaClient } from '@prisma/client';

export const deleteVinyls = (prismaClient: PrismaClient) =>
    prismaClient.vinylRecord.deleteMany();

export const createVinyls = async (prismaClient: PrismaClient) => {
    const vinyls = [
        {
            title: 'The Dark Side of the Moon',
        },
        {
            title: 'Abbey Road',
        },
    ];

    for (const vinyl of vinyls) {
        await prismaClient.vinylRecord.create({
            data: vinyl,
        });
    }
}

