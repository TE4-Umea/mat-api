const express = require('express');
const router = express.Router();
const { body, param, query, header } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const mealController = require('../controllers/meal_controller');

// getAll /api/meal
router.get('/',
    query('page').isInt().optional({ nullable: true }),
    header('jwt-token').isJWT(),
    mealController.getAll
);

// Search /api/meal/search/:name
router.get(
    '/search/:name',
    param('name').isString().escape(),
    header('jwt-token').isJWT(),
    mealController.search
);

// Create /api/meal, creates a new meal that a user has eaten
router.post('/',
    //body('stuff'),
    header('jwt-token').isJWT(),
    mealController.create
);

// Update /api/meal/:id, updates a meal that a user has eaten
router.put('/:id',
    param('id').isInt(),
    //body('stuff'),
    header('jwt-token').isJWT(),
    mealController.update
);


// Delete /api/meal/:id, deletes a meal that a user has eaten
router.delete('/:id',
    param('id').isInt(),
    header('jwt-token').isJWT(),
    mealController.delete
);

module.exports = router;