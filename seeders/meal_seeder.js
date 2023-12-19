const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const user = 1;
    await prisma.meal.createMany({
        data: [
            { userId: user, dishId: 1, type: 'middag', time: new Date() },
            { userId: user, dishId: 3, type: 'lunch', time: new Date() },
            { userId: user, dishId: 3, type: 'middag', time: new Date(new Date().setDate(new Date().getDate() + 1)) },
            { userId: user, dishId: 4, type: 'lunch', time: new Date(new Date().setDate(new Date().getDate() + 1)) },
            { userId: user, dishId: 3, type: 'middag', time: new Date(new Date().setDate(new Date().getDate() + 2)) },
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
