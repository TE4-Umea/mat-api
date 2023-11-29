const express = require('express');
const router = express.Router();
const { body, param, query, header } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categoryController = require('../controllers/category_controller');

// getAll /api/category
router.get(
    '/',
    header('jwt-token').isJWT(),
    categoryController.getAll
);

// get:id /api/category/:id
router.get('/:id',
    param('id').isInt(),
    header('jwt-token').isJWT(),
    categoryController.getOne
);

