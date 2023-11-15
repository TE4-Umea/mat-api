const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const userController = require('../controllers/user_controller');

// idk

// getAll /api/user
router.get('/', userController.getAll);

// get:id /api/user/:id
router.get('/:id',
    param('id').isInt(),
    userController.getOne
);

// create /api/user, creates a new user
router.post('/',
    query('email').isEmail().normalizeEmail(),
    userController.create
);

// login? /api/user/login, logs in a user

// delete /api/user/:id, deletes user and all meals associated with them
// tested manually and works
router.delete('/:id',
    param('id').isInt(),
    userController.delete
);

module.exports = router;