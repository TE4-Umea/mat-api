const { validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// getAll /api/meal
module.exports.getAll = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }

    const meals = await prisma.meal.findMany({
        include: {
            dish: true
        },
        orderBy: {
            id: 'desc',
        },
    });
    res.json(meals);
};

// Search /api/meal/search/:name
module.exports.search = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }

    const { name } = req.params;
    const meal = await prisma.meal.findMany({
        where: {
            name: {
                contains: name
            }
        },
        include: {
            dish: true
        },
        orderBy: {
            id: 'desc',
        },
    });
    res.json(meal);
};

// Create /api/meal, creates a new meal that a user has eaten
module.exports.create = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }

    const { userId, dishId, type } = req.body;

    const meal = await prisma.meal.create({
        data: {
            userId: parseInt(userId),
            dishId: parseInt(dishId),
            type: type
        }
    });
    res.json(meal);
};

// Update /api/meal/:id, updates a meal that a user has eaten
module.exports.update = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }

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