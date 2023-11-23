const express = require('express');
const router = express.Router();
const { body, param, query, header } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const userController = require('../controllers/user_controller');

// idk, im not sure how or which of these are gonna get used

// getAll /api/user
router.get('/', userController.getAll);

// create /api/user, creates a new user
router.post('/:email',
    param('email').isEmail().normalizeEmail(), // not sure how email comes from auth
    userController.create
);

// login? /api/user/login, logs in a user

// delete /api/user/:id, deletes user and all meals associated with them
router.delete('/',
    header('jwt-token').isJWT(),
    userController.delete
);

module.exports = router;