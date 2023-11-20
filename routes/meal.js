const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const mealController = require('../controllers/meal_controller');

// getAll /api/meal
router.get('/',
    //query('page').isInt(), // it breaks if you don't include a page
    mealController.getAll
);

// Search /api/meal/search/:name
router.get(
    '/search/:name',
    param('name').isString().escape(),
    mealController.search
);

// Create /api/meal, creates a new meal that a user has eaten
router.post('/',
    //body('stuff'),
    mealController.create
);

// Update /api/meal/:id, updates a meal that a user has eaten
router.put('/:id',
    param('id').isInt(),
    //body('stuff'),
    mealController.update
);


// Delete /api/meal/:id, deletes a meal that a user has eaten
router.delete('/:id',
    param('id').isInt(),
    mealController.delete
);

module.exports = router;