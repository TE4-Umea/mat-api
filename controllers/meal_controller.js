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
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }

    const dishId = req.body.meal.dishId;
    const type = req.body.meal.type;
    const time = req.body.meal.time;

    const meal = await prisma.meal.create({
        data: {
            userId: req.tokenInfo.id,           // userId from token
            dishId: parseInt(dishId),       // dishId from hidden(?) in body
            type: type,                     // frukost, lunch, middag, 
            time: time                      // time from dropdown
        }
    });
    res.json(meal);
};

// Update /api/meal/:id, updates a meal that a user has eaten
// not to be used right now, kinda wack if caller doesn't send all fields
module.exports.update = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }

    const { id } = req.params;
    const dishId = req.body.meal.dishId || null;
    const type = req.body.meal.type || null;
    const time = req.body.meal.time || null;
    const icon = req.body.meal.icon || null;

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
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }

    const { id } = req.params;

    const meal = await prisma.meal.delete({
        where: {
            id: parseInt(id)
        }
    });
    res.json(meal);
};