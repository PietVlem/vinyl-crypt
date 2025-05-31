import type { PrismaClient } from '@prisma/client';
import artists from '../data/artists.json';

export const deleteArtists = async (prismaClient: PrismaClient) => {
    await prismaClient.artistAlias.deleteMany();
    prismaClient.artist.deleteMany();
} 

export const createArtistWithAliases = async (prismaClient: PrismaClient) => {
    for (const artist of artists) {
        const createdArtist = await prismaClient.artist.create({
            data: {
                bio: artist.bio,
                country: artist.country,
                birthDate: artist.birthDate,
                deathDate: artist.deathDate,
            }
        });

        for (const alias of artist.aliases) {
            await prismaClient.artistAlias.create({
                data: {
                    artist: { connect: { id: createdArtist.id } },
                    name: alias.name,
                    isPrimary: alias.isPrimary,
                },
            });
        }
    }
}