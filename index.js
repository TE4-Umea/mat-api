const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    // ... you will write your Prisma Client queries here

    await prisma.meal.create({
        data: {
            userId: 1,
            dishId: 5,
            type: 'lunch',
        },
    })

    const allMeals = await prisma.meal.findMany({
        orderBy: {
            id: 'desc',
        },
        include: {
            dish: true,
            user: true,
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
