const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// idk

// getAll /api/user
router.get('/', async (req, res) => {
    const users = await prisma.user.findMany({
        orderBy: {
            id: 'desc',
        },
    });
    res.json(users);
});

// get:id /api/user/:id
router.get('/:id',
    param('id').isInt(),
    async (req, res) => {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id)
            },
        });
        res.json(user);
    }
)

// create /api/user, creates a new user
router.post('/', query('email').isEmail().normalizeEmail(), async (req, res) => {
    const { email } = req.body; // not req.body, use auth instead 
    const user = await prisma.user.create({
        data: {
            email: email,
        }
    });
    res.json(user);
});

// login? /api/user/login, logs in a user

// delete /api/user/:id, deletes user and all meals associated with them
// tested manually and works
router.delete('/:id', param('id').isInt(), async (req, res) => {
    const { id } = req.params;
    const meal = await prisma.meal.deleteMany({
        where: {
            userId: parseInt(id)
        }
    });

    const user = await prisma.user.delete({
        where: {
            id: parseInt(id)
        }
    });

    res.json(user);
});

module.exports = router;