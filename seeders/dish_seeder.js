const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    // math.random then add numbers to data?
    await prisma.dish.createMany({
        data: [
            { name: 'Hamburgare' },
            { name: 'Köttbullar' },
            { name: 'Korv' },
            { name: 'Pannkakor' },
            { name: 'Kebab' },
            { name: 'Pizza' },
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