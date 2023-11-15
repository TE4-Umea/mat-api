const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    await prisma.meal.createMany({
        data: [
            { userId: 1, dishId: 1, type: 'middag' },
            { userId: 1, dishId: 2, type: 'lunch' },
            { userId: 1, dishId: 3, type: 'frukost' },
            { userId: 2, dishId: 4, type: 'lunch' },
            { userId: 2, dishId: 2, type: 'middag' },
        ],
    })
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
