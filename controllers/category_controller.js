const { validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

// getAll /api/category
module.exports.getAll = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }

    const categories = await prisma.category.findMany({
        orderBy: {
            id: 'desc',
        },
        include: {
            categoryOnDish: {
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

    const category = await prisma.category.findUnique({
        where: {
            id: parseInt(id),
        },
        include: {
            categoryOnDish: {
                include: {
                    dish: true
                }
            }
        },
    });
    res.json(category);
};