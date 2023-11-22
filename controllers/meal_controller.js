const { validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

// getAll /api/meal
module.exports.getAll = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }
    const skip = req.query.page || 0;

    let tokenInfo;
    try {
        const verified = jwt.verify(req.headers['jwt-token'], process.env.JWT_SECRET);
        console.log('token checked');
        if (verified) {
            // Access Granted
            console.log('access granted');
            tokenInfo = jwt.decode(req.headers['jwt-token']);
            console.log(tokenInfo);
        } else {
            // Access Denied
            return res.status(401).json({ message: 'error: bad token' });
        }
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: 'error: bad token' });
    }

    // TODO: sorted by user
    const meals = await prisma.meal.findMany({
        where: {
            userId: tokenInfo.id
        },
        include: {
            dish: true
        },
        orderBy: {
            time: 'desc',
        },
        take: 10,
        skip: 0 + (skip * 10),
    });
    res.json(meals);
};
// ^^^^ fully works

// Search /api/meal/search/:name
module.exports.search = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }

    const { name } = req.params;

    // sorted by user
    // takes 10
    const meal = await prisma.meal.findMany({
        where: {
            AND: [
                {
                    dish: {
                        name: {
                            contains: name
                        }
                    },
                },
                {
                    //userId: from users database
                    userId: 1
                }
            ]
        },
        include: {
            dish: true
        },
        orderBy: {
            id: 'desc',
        },
        take: 10
    });
    res.json(meal);
};

// Create /api/meal, creates a new meal that a user has eaten
module.exports.create = async (req, res) => {
    const { userId, dishId, type } = req.body;

    const meal = await prisma.meal.create({
        data: {
            userId: parseInt(userId),
            dishId: parseInt(dishId),
            type: type,
            //time: Date() from dropdown
        }
    });
    res.json(meal);
};

// Update /api/meal/:id, updates a meal that a user has eaten
module.exports.update = async (req, res) => {
    const { id } = req.params;
    const { userId, dishId, type } = req.body;

    const meal = await prisma.meal.update({
        where: {
            id: parseInt(id)
        },
        data: {
            userId: parseInt(userId),
            dishId: parseInt(dishId),
            type: type
            //time: Date() from dropdown?
        }
    });
    res.json(meal);
};

// delete /api/meal/:id
module.exports.delete = async (req, res) => {
    const { id } = req.params;
    const meal = await prisma.meal.delete({
        where: {
            id: parseInt(id)
        }
    });
    res.json(meal);
};