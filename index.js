const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    // ... you will write your Prisma Client queries here

    await prisma.dish.create({
        data: {
            name: 'Korv med potatismos',
        },
    })

    const allDishes = await prisma.dish.findMany({})

    console.dir(allDishes, { depth: null })
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
