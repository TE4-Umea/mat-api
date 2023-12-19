const express = require('express');
const router = express.Router();
const { body, param, query, header } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const mealController = require('../controllers/meal_controller');
const { auth } = require('../middleware/auth');

// getAll /api/meal
router.get('/',
    query('page').isInt().optional({ nullable: true }),
    auth,
    mealController.getAll
);

// Search /api/meal/search/:name
router.get(
    '/search/:name',
    param('name').isString().escape(),
    auth,
    mealController.search
);

// Create /api/meal, creates a new meal that a user has eaten
router.post('/',
    query('dishId').isInt(),
    query('time').isISO8601(),
    query('type').isString().escape(),
    auth,
    mealController.create
);

// Update /api/meal/:id, updates a meal that a user has eaten
router.put('/:id',
    param('id').isInt(),
    query('dishId').isInt().optional({ nullable: true }),
    query('time').isISO8601().optional({ nullable: true }),
    query('type').isString().escape().optional({ nullable: true }),
    auth,
    mealController.update
);


// Delete /api/meal/:id, deletes a meal that a user has eaten
router.delete('/:id',
    param('id').isInt(),
    auth,
    mealController.delete
);

module.exports = router;