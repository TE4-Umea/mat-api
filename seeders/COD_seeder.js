const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    await prisma.categoryOnDish.createMany({
        data: [
            { dishId: 1, categoryId: 4 },
            { dishId: 1, categoryId: 1 },
            { dishId: 2, categoryId: 3 },
            { dishId: 3, categoryId: 3 },
            { dishId: 4, categoryId: 1 },
            { dishId: 5, categoryId: 2 },
            { dishId: 6, categoryId: 1 },
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