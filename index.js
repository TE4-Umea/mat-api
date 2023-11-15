const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    await prisma.meal.create({
        data: {
            userId: 3,
            dishId: 16,
            type: 'middag',
        },
    })

    // await prisma.dish.create({
    //     data: {
    //         name: 'testburgare9',
    //     },
    // })

    const allMeals = await prisma.dish.findMany({
        orderBy: {
            id: 'desc',
        }
    })

    console.dir(allMeals, { depth: null })
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
