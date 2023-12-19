const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    await prisma.categoryOnDish.createMany({
        data: [
            { dishId: 1, categoryId: 3 },
            { dishId: 2, categoryId: 5 },
            { dishId: 3, categoryId: 3 },
            { dishId: 4, categoryId: 3 },
            { dishId: 5, categoryId: 3 },
            { dishId: 6, categoryId: 3 },
            { dishId: 7, categoryId: 3 },
            { dishId: 8, categoryId: 3 },
            // { dishId: 9, categoryId: 3 },
            { dishId: 10, categoryId: 3 },
            { dishId: 11, categoryId: 3 },
            { dishId: 12, categoryId: 3 },
            { dishId: 13, categoryId: 3 },
            { dishId: 14, categoryId: 3 },
            { dishId: 15, categoryId: 4 },
            { dishId: 16, categoryId: 4 },
            { dishId: 17, categoryId: 4 },
            { dishId: 18, categoryId: 1 },
            { dishId: 19, categoryId: 1 },
            { dishId: 19, categoryId: 2 },
            { dishId: 20, categoryId: 1 },
            { dishId: 20, categoryId: 2 },
            { dishId: 21, categoryId: 1 },
            { dishId: 21, categoryId: 2 },
            { dishId: 22, categoryId: 1 },
            { dishId: 22, categoryId: 2 },
            { dishId: 23, categoryId: 1 },
            { dishId: 23, categoryId: 2 },
            { dishId: 24, categoryId: 1 },
            { dishId: 24, categoryId: 2 },
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