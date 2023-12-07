const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    await prisma.category.createMany({
        data: [
            { name: 'Vegetariansk' },
            { name: 'Vegansk' },
            { name: 'Kött' },
            { name: 'Fisk' },
            { name: 'Kyckling' }
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