const { validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// getAll /api/dish
module.exports.getAll = async (req, res) => {
    const dishes = await prisma.dish.findMany({
        orderBy: {
            id: 'desc',
        },
    });
    res.json(dishes);
};

// get:id /api/dish/:id
module.exports.getOne = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }

    const { id } = req.params;
    const dish = await prisma.dish.findUnique({
        where: {
            id: parseInt(id)
        },
        // should you get the times you have eaten this here?
    });
    res.json(dish);
};

// Search /api/dish/search/:name
module.exports.search = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }

    const { name } = req.params;
    const dish = await prisma.dish.findMany({
        where: {
            name: {
                contains: name
            }
        },
        orderBy: {
            id: 'desc',
        },
        take: 10,
    });
    res.json(dish);
};

// Create /api/dish
module.exports.create = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }

    //const { name } = req.body;
    const dish = await prisma.dish.create({
        data: {
            name: 'testBurgare11'
        }
    });
    res.json(dish);
};

// delete /api/dish/:id
module.exports.delete = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }

    const { id } = req.params;
    const dish = await prisma.dish.delete({
        where: {
            id: parseInt(id)
        }
    });

    // Should someone elses past foods be deleted when I delete a dish? idk
    // delete all meals with this dishId
    // const meal = await prisma.meal.deleteMany({
    //     where: {
    //         dishId: parseInt(id)
    //     }
    // });

    res.json(dish); // returns the deleted dish, kinda useless
};