const { validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

// getAll /api/category
module.exports.getAll = async (req, res) => {
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
            return res.status(401).json({ errors: 'error: bad token' });
        }
    } catch (err) {
        console.log(err);
        return res.status(401).json({ errors: 'error: bad token' });
    }

    const categories = await prisma.category.findMany({
        orderBy: {
            id: 'desc',
        },
        include: {
            dishOnCategory: {
                include: {
                    dish: true
                }
            }
        },
    });
    res.json(categories);
};

// get:id /api/category/:id
module.exports.getOne = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }
    const { id } = req.params;

    let tokenInfo;
    try {
        const verified = jwt.verify(req.headers['jwt-token'], process.env.JWT_SECRET);
        if (verified) {
            // Access Granted
            tokenInfo = jwt.decode(req.headers['jwt-token']);
        } else {
            // Access Denied
            return res.status(401).json({ errors: 'error: bad token' });
        }
    } catch (err) {
        console.log(err);
        return res.status(401).json({ errors: 'error: bad token' });
    }

    const category = await prisma.category.findUnique({
        where: {
            id: parseInt(id),
        },
        include: {
            dishOnCategory: {
                include: {
                    dish: true
                }
            }
        },
    });
    res.json(category);
};