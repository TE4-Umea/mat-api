const { validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

// getAll /api/saved
module.exports.getAll = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }
    const skip = req.query.page || 0;

    const saveds = await prisma.saved.findMany({
        where: {
            userId: req.tokenInfo.id
        },
        include: {
            dish: true
        },
        orderBy: {
            id: 'desc',
        },
        take: 20,
        skip: 0 + (skip * 20),
    });
    res.json(saveds);
    //res.json({ saveds: saveds }); // TODO: Which do I use?
};

// Search /api/saved/search/:name
module.exports.search = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }

    const { name } = req.params;

    // sorted by user
    // takes 10
    const saved = await prisma.saved.findMany({
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
                    userId: req.tokenInfo.id
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
    res.json(saved);
};

// Create /api/saved, creates a new saved that a user has eaten
module.exports.create = async (req, res) => {
    const { dishId } = req.query;

    const exists = await prisma.saved.findFirst({
        where: {
            AND: [
                {
                    userId: req.tokenInfo.id
                },
                {
                    dishId: parseInt(dishId)
                }
            ]
        }
    });
    if (exists !== null) {
        return res.status(400).json({ errors: [{ 'msg': 'Already exists in users saved' }] });
    }

    const saved = await prisma.saved.create({
        data: {
            userId: req.tokenInfo.id,           // userId from token
            dishId: parseInt(dishId),       // dishId from hidden(?) in body
        }
    });
    res.json(saved);     // TODO: do I need to return anything?
};

// delete /api/saved/:id
module.exports.delete = async (req, res) => {
    const { id } = req.params;

    // TODO: change
    const saved = await prisma.saved.delete({
        where: {
            id: parseInt(id)
        }
    });
    res.json(saved);
};