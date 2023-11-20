const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    // math.random then add numbers to data?
    const random = Math.floor(Math.random() * 10) + 1;
    await prisma.dish.createMany({
        data: [
            { name: `Hamburgare${random}` },
            { name: `Köttbullar${random}` },
            { name: `Korv${random}` },
            { name: `Pannkakor${random}` },
            { name: `Kebab${random}` },
            { name: `Pizza${random}` },
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