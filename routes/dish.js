const express = require('express');
const router = express.Router();
const { body, param, query, header } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { auth } = require('../middleware/auth');

const dishController = require('../controllers/dish_controller');

// getAll /api/dish
router.get(
    '/',
    query('page').isInt().optional({ nullable: true }),
    auth,
    dishController.getAll
);

// get:id /api/dish/:id
router.get('/:id',
    param('id').isInt(),
    auth,
    dishController.getOne
);

// Search /api/dish/search/:name
router.get(
    '/search/:name',
    param('name').isString().escape(),
    auth,
    dishController.search
);

// Create /api/dish, creates a new dish that everyone can use
router.post('/',
    body('dish.name').isString().escape(),
    body('dish.desc').isString().escape().optional({ nullable: true }),
    auth,
    dishController.create
);

// UPDATE?

// DELETE /api/dish/:id
router.delete('/:id',
    param('id').isInt(),
    auth,
    dishController.delete
);

module.exports = router;