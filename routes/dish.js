const express = require('express');
const router = express.Router();
const { body, param, query, header } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const dishController = require('../controllers/dish_controller');

// getAll /api/dish
router.get(
    '/',
    query('page').isInt().optional({ nullable: true }),
    header('jwt-token').isJWT(),
    dishController.getAll
);

// get:id /api/dish/:id
router.get('/:id',
    param('id').isInt(),
    header('jwt-token').isJWT(),
    dishController.getOne
);

// Search /api/dish/search/:name
router.get(
    '/search/:name',
    param('name').isString().escape(),
    header('jwt-token').isJWT(),
    dishController.search
);

// Create /api/dish, creates a new dish that everyone can use
router.post('/',
    // body('name').isString().escape(),
    query('name').isString().escape(),      // which one do i use?
    header('jwt-token').isJWT(),
    dishController.create
);

// UPDATE?

// DELETE /api/dish/:id
router.delete('/:id',
    param('id').isInt(),
    header('jwt-token').isJWT(),
    dishController.delete
);

module.exports = router;