const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const user = 1;
    await prisma.saved.createMany({
        data: [
            { dishId: 1, userId: user },
            { dishId: 11, userId: user },
            { dishId: 3, userId: user },
            { dishId: 4, userId: user },
            { dishId: 5, userId: user },
            { dishId: 6, userId: user },
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