const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    //const random = Math.floor(Math.random() * 10) + 1;
    // await prisma.dish.create({
    // data: {
    // name: 'Sallad', img: 'sallad.jpg', desc: 'Gör sallad. Servera. ',
    // categoryOnDish: {
    // connectOrCreate: {
    // where: {
    // categoryId: 2,
    // },
    // create: { name: 'Vegansk' }
    // }
    // }
    // },
    // });

    // categoryOnDish { findOrCreate: { category: { name: 'Kött'} } } // idk
    await prisma.dish.createMany({
        data: [
            { name: 'Hamburgare', img: 'hamburgare.jpg', desc: 'Stek hamburgare. Servera med bröd och ketchup. ' },
            { name: 'Kycklingburgare', img: 'kycklingburgare.jpg', desc: 'Stek kycklingburgare. Servera med bröd och ketchup. ' },
            { name: 'Cheeseburgare', img: 'cheeseburgare.jpg', desc: 'Stek hamburgare. Servera med bröd, ost och ketchup. ' },
            { name: 'Kebab', img: 'kebab.jpg', desc: 'Stek kebab. Servera med typ pommes och någon salad. ' },
            { name: 'Korv med bröd', img: 'korv_brod.jpg', desc: 'Stek korv. Servera med bröd och ketchup. ' },
            { name: 'Korv och makaroner', img: 'korv_makaroner.jpeg', desc: 'Koka makaroner. Stek korv. Servera. ' },
            { name: 'Korv stroganoff med ris', img: 'korvstroganoff_ris.jpg', desc: 'Stek korv. Blanda korv med krossade tomater och grädde. Servera med ris. ' },
            { name: 'Falukorv med potatis', img: 'falukorv_potatis.jpg', desc: 'Stek falukorv. Koka potatis. Servera. ' },
            { name: 'Pizza', img: 'pizza.jpg', desc: 'Ta pizzadeg och smet ut den över en plåt. Lägg på tomatsås, ost och andra ingredienser. Grädda pizzan i ugnen i 20 minuter. ' },
            { name: 'Köttbullar med potatismos', img: 'kottbullar_potatismos.jpg', desc: 'Stek köttbullar. Koka potatis. Servera. ' },
            { name: 'Köttbullar med makaroner', img: 'kottbullar_makaroner.jpg', desc: 'Stek köttbullar. Koka makaroner. Servera. ' },
            { name: 'Makaronigryta', img: 'makaronigryta.JPG', desc: 'Koka makaroner. Stek köttfärs.  Blanda makaroner med köttfärsen. Servera. ' },
            { name: 'Köttfärssås med spaghetti', img: 'spaghetti_kottfarssas.jpg', desc: 'Koka spaghetti. Stek köttfärs. Blanda köttfärsen med krossade tomater. Servera. ' },
            { name: 'Skinksås med pasta', img: 'skinksas.jpg', desc: 'Koka pasta. Gör skinksås. Blanda skinkan med krossade tomater. Servera. ' },

            { name: 'Fiskpinnar', img: 'fiskpinnar.jpg', desc: 'Stek fiskpinnar. Potatis rekommenderas till sidan. Servera. ' },
            { name: 'Kokt lax med potatis', img: 'lax_potatis.jpg', desc: 'Koka lax samt potatis. Servera. ' },
            { name: 'Kokt torsk med potatis', img: 'torsk_potatis.jpg', desc: 'Koka torsk samt potatis. Servera. ' },

            { name: 'Pannkakor', img: 'pannkakor.jpg', desc: 'Stek pannkakor. Servera med sylt och grädde. ' },

            { name: 'Tomatsoppa', img: 'tomatsoppa.jpg', desc: 'Koka tomatsoppa. Servera. ' },
            { name: 'Morotssoppa', img: 'morotssoppa.jpg', desc: 'Koka morotssoppa. Servera. ' },
            { name: 'Pumpasoppa', desc: 'Koka pumpasoppa. Servera. ' },
            { name: 'Sallad', img: 'sallad.jpg', desc: 'Gör sallad. Servera. ' },
            { name: 'Linsgryta', img: 'linsgryta.jpg', desc: 'Koka linser. Stek lök. Blanda linserna med löken. Servera. ' },
            { name: 'Falafel', img: 'falafel.jpg' },

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