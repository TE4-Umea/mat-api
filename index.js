const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {

    await prisma.meal.create({
        data: {
            userId: 2,
            dishId: 1,
            type: 'lunch',
        },
    })

    const allMeals = await prisma.dish.findMany({
        orderBy: {
            id: 'desc',
        },
        include: {
            meal: true,
        },
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
