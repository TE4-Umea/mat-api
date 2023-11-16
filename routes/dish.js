const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const dishController = require('../controllers/dish_controller');

// getAll /api/dish
// pagination
router.get(
    '/',
    /* query(stuff), 
    authByToken, */
    dishController.getAll
);

// get:id /api/dish/:id
router.get('/:id',
    param('id').isInt(),
    dishController.getOne
);

// Search /api/dish/search/:name
router.get(
    '/search/:name',
    param('name').isString().escape(),
    dishController.search
);

// Create /api/dish, creates a new dish that everyone can use
router.post('/',
    //body('name').isString().escape(),
    dishController.create
);

// UPDATE?

// DELETE /api/dish/:id
router.delete('/:id',
    param('id').isInt(),
    dishController.delete
);

module.exports = router;