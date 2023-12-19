const { validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

// getAll /api/meal
module.exports.getAll = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }
    const skip = req.query.page || 0;

    const meals = await prisma.meal.findMany({
        where: {
            userId: req.tokenInfo.id
        },
        include: {
            dish: true
        },
        orderBy: {
            time: 'desc',
        },
        take: 40,
        skip: 0 + (skip * 40),
    });
    res.json(meals);
    //res.json({ meals: meals }); // TODO: Which do I use?
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
                    userId: req.tokenInfo.id
                }
            ]
        },
        include: {
            dish: true
        },
        orderBy: {
            time: 'desc',
        },
        take: 10
    });
    res.json(meal);
};

// Create /api/meal, creates a new meal that a user has eaten
module.exports.create = async (req, res) => {
    const { dishId, type, time } = req.query;

    const meal = await prisma.meal.create({
        data: {
            userId: req.tokenInfo.id,           // userId from token
            dishId: parseInt(dishId),       // dishId from hidden(?) in body
            type: type,                     // frukost, lunch, middag, 
            time: time                      // time from dropdown
        }
    });
    res.json(meal);     // TODO: do I need to return anything?
};

// Update /api/meal/:id, updates a meal that a user has eaten
// not to be used right now, kinda
module.exports.update = async (req, res) => {
    const { id } = req.params;
    const dishId = req.query.dishId || null;
    const type = req.query.type || null;
    const time = req.query.time || null;
    const icon = req.query.icon || null;

    const meal = await prisma.meal.update({
        where: {
            id: parseInt(id)
        },
        data: {
            userId: req.tokenInfo.id,
            dishId: parseInt(dishId),
            type: type,
            icon: icon,
            time: time
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