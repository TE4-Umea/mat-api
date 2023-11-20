const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    await prisma.user.createMany({
        data: [
            { email: 'test@test.com' },
            { email: 'test2@test.com' },
            { email: 'test3@test.com' },
            { email: 'test4@test.com' },
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
