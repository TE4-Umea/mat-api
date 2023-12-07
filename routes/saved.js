const express = require('express');
const router = express.Router();
const { body, param, query, header } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const savedController = require('../controllers/saved_controller');

// getAll /api/saved
router.get('/',
    query('page').isInt().optional({ nullable: true }),
    header('jwt-token').isJWT(),
    savedController.getAll
);

// Search /api/saved/search/:name
router.get(
    '/search/:name',
    param('name').isString().escape(),
    header('jwt-token').isJWT(),
    savedController.search
);

// Create /api/saved, creates a new saved dish
router.post('/',
    query('dishId').isInt(),
    header('jwt-token').isJWT(),
    savedController.create
);

// Delete /api/saved/:id, deletes a saved that a user has eaten
router.delete('/:id',
    param('id').isInt(),
    header('jwt-token').isJWT(),
    savedController.delete
);

module.exports = router;