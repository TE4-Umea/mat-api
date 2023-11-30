const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const user = 14
    await prisma.meal.createMany({
        data: [
            { userId: user, dishId: 1, type: 'middag' },
            { userId: user, dishId: 2, type: 'lunch' },
            { userId: user, dishId: 3, type: 'middag' },
            { userId: user, dishId: 4, type: 'lunch' },
            { userId: user, dishId: 2, type: 'middag' },
        ],
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
