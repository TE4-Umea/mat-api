const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// getAll /api/meal
// add pagination
router.get('/', async (req, res) => {
    const meals = await prisma.meal.findMany({
        include: {
            dish: true
        },
        orderBy: {
            id: 'desc',
        },
    });
    res.json(meals);
})

// Search /api/meal/search/:name
router.get(
    '/search/:name',
    body('name').isString(),
    async (req, res) => {
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
    }
);

// Create /api/meal, creates a new meal that a user has eaten
router.post('/', async (req, res) => {
    const { userId, dishId, type } = req.body;
    const meal = await prisma.meal.create({
        data: {
            userId: parseInt(userId),
            dishId: parseInt(dishId),
            type: type
        }
    });
    res.json(meal);
});

// Update /api/meal/:id, updates a meal that a user has eaten
router.put('/:id',
    param('id').isInt(),
    async (req, res) => {
        const { id } = req.params;
        const { userId, dishId, type } = req.body;
        const meal = await prisma.meal.update({
            where: {
                id: parseInt(id)
            },
            data: {
                dishId: parseInt(dishId),
                type: type
            }
        });
        res.json(meal);
    }
);


// Delete /api/meal/:id, deletes a meal that a user has eaten
router.delete('/:id',
    param('id').isInt(),
    async (req, res) => {
        const { id } = req.params;
        const meal = await prisma.meal.delete({
            where: {
                id: parseInt(id)
            }
        });
        res.json(meal);
    }
);

module.exports = router;