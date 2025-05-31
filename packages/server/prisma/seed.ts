import { PrismaClient } from '@prisma/client'
import {
    createArtistWithAliases,
    createGenres,
    createMainUser,
    createStyles,
    deleteArtists,
    deleteGenres,
    deleteStyles,
    deleteUsers,
} from './seeds'

const prisma = new PrismaClient()

async function main() {
    await deleteGenres(prisma)
    await deleteStyles(prisma)
    await deleteArtists(prisma)
    await deleteUsers(prisma)

    const user = await createMainUser(prisma)
    // await createGenres(prisma)
    // await createStyles(prisma)
    await createArtistWithAliases(prisma, user)
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