const express = require('express');
const router = express.Router();
const { body, param, query, header } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categoryController = require('../controllers/category_controller');
const { auth } = require('../middleware/auth');

// getAll /api/category
router.get(
    '/',
    auth,
    categoryController.getAll
);

// get:id /api/category/:id
router.get('/:id',
    param('id').isInt(),
    auth,
    categoryController.getOne
);

module.exports = router;