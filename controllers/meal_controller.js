const { validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// getAll /api/meal
module.exports.getAll = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }
    const skip = req.query.page || 0;

    // TODO: sorted by user
    const meals = await prisma.meal.findMany({
        // where: {
        //     userId: from users database
        // },
        include: {
            dish: true
        },
        orderBy: {
            time: 'desc',
        },
        take: 10,
        skip: 0 + (skip * 10),
    });
    res.json(meals);
};

// Search /api/meal/search/:name
module.exports.search = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }

    const { name } = req.params;

    // sorted by user
    // takes 10
    const meal = await prisma.meal.findMany({
        where: {
            AND: [
                {
                    dish: {
                        name: {
                            contains: name
                        }
                    },
                },
                {
                    //userId: from users database
                    userId: 1
                }
            ]
        },
        include: {
            dish: true
        },
        orderBy: {
            id: 'desc',
        },
        take: 10
    });
    res.json(meal);
};

// Create /api/meal, creates a new meal that a user has eaten
module.exports.create = async (req, res) => {
    const { userId, dishId, type } = req.body;

    const meal = await prisma.meal.create({
        data: {
            userId: parseInt(userId),
            dishId: parseInt(dishId),
            type: type,
            //time: Date() from dropdown
        }
    });
    res.json(meal);
};

// Update /api/meal/:id, updates a meal that a user has eaten
module.exports.update = async (req, res) => {
    const { id } = req.params;
    const { userId, dishId, type } = req.body;

    const meal = await prisma.meal.update({
        where: {
            id: parseInt(id)
        },
        data: {
            userId: parseInt(userId),
            dishId: parseInt(dishId),
            type: type
        }
    });
    res.json(meal);
};

// delete /api/meal/:id
module.exports.delete = async (req, res) => {
    const { id } = req.params;
    const meal = await prisma.meal.delete({
        where: {
            id: parseInt(id)
        }
    });
    res.json(meal);
};