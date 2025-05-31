import { PrismaClient } from '@prisma/client'
import {
    createArtistWithAliases,
    createGenres,
    createStyles,
    createVinyls,
    deleteArtists,
    deleteGenres,
    deleteStyles,
    deleteVinyls,
} from './seeds'

const prisma = new PrismaClient()

async function main() {
    await deleteGenres(prisma)
    await deleteStyles(prisma)
    await deleteArtists(prisma)

    // await createGenres(prisma)
    // await createStyles(prisma)
    await createArtistWithAliases(prisma)
    await createVinyls(prisma)
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })