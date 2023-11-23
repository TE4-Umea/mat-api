const { validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

// getAll /api/user
module.exports.getAll = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }

    const users = await prisma.user.findMany({
        orderBy: {
            id: 'desc',
        },
    });
    res.json(users);
};

// create /api/user, creates a new user or logs in an existing user
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

    res.status(200).send(token);
};

// delete /api/user/, deletes user and all meals associated with them
module.exports.delete = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }

    let tokenInfo;
    try {
        const verified = jwt.verify(req.headers['jwt-token'], process.env.JWT_SECRET);
        if (verified) {
            // Access Granted
            tokenInfo = jwt.decode(req.headers['jwt-token']);
        } else {
            // Access Denied
            return res.status(401).json({ message: 'error: bad token' });
        }
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: 'error: bad token' });
    }

    const meal = await prisma.meal.deleteMany({
        where: {
            userId: tokenInfo.id
        }
    });

    const user = await prisma.user.delete({
        where: {
            id: tokenInfo.id
        }
    });

    res.json(user);
};
