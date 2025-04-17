import { PrismaClient } from '@prisma/client'
import {
    createGenres,
    createStyles,
    deleteGenres,
    deleteStyles,
} from './seeds'

const prisma = new PrismaClient()

async function main() {
    /* Delete current data */
    await deleteGenres(prisma)
    await deleteStyles(prisma)

    /* Create new data */
    await createGenres(prisma)
    await createStyles(prisma)
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