const { validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

// getAll /api/user
module.exports.getAll = async (req, res) => {
    const users = await prisma.user.findMany({
        orderBy: {
            id: 'desc',
        },
    });
    res.json(users);
};

// get:id /api/user/:id
module.exports.getOne = async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(id)
        },
    });
    res.json(user);
};

// create /api/user, creates a new user
module.exports.create = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }
    const { email } = req.params; // idk 
    const jwtSecretKey = process.env.JWT_SECRET;
    let token;

    const userExists = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if (userExists === null) {
        const user = await prisma.user.create({
            data: {
                email: email,
            }
        });

        token = jwt.sign(user, jwtSecretKey);
    } else {
        token = jwt.sign(userExists, jwtSecretKey);
    }

    // JWT token
    res.status(200).send(token);
};

// login? /api/user/login, logs in a user


// delete /api/user/:id, deletes user and all meals associated with them
module.exports.delete = async (req, res) => {
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
};
