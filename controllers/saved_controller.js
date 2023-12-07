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

    let tokenInfo;
    try {
        const verified = jwt.verify(req.headers['jwt-token'], process.env.JWT_SECRET);
        if (verified) {
            // Access Granted
            tokenInfo = jwt.decode(req.headers['jwt-token']);
        } else {
            // Access Denied
            return res.status(401).json({ errors: [{ 'msg': 'Improper token' }] });
        }
    } catch (err) {
        console.log(err);
        return res.status(401).json({ errors: [{ 'type': err.name, 'msg': err.message }] });
    }

    const saveds = await prisma.saved.findMany({
        where: {
            userId: tokenInfo.id
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

    let tokenInfo;
    try {
        const verified = jwt.verify(req.headers['jwt-token'], process.env.JWT_SECRET);
        if (verified) {
            // Access Granted
            tokenInfo = jwt.decode(req.headers['jwt-token']);
        } else {
            // Access Denied
            return res.status(401).json({ errors: [{ 'msg': 'Improper token' }] });
        }
    } catch (err) {
        console.log(err);
        return res.status(401).json({ errors: [{ 'type': err.name, 'msg': err.message }] });
    }

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
                    userId: tokenInfo.id
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

    let tokenInfo;
    try {
        const verified = jwt.verify(req.headers['jwt-token'], process.env.JWT_SECRET);
        if (verified) {
            // Access Granted
            tokenInfo = jwt.decode(req.headers['jwt-token']);
        } else {
            // Access Denied
            return res.status(401).json({ errors: [{ 'msg': 'Improper token' }] });
        }
    } catch (err) {
        console.log(err);
        return res.status(401).json({ errors: [{ 'type': err.name, 'msg': err.message }] });
    }

    // doesn't work
    const exists = await prisma.saved.findFirst({
        where: {
            AND: [
                {
                    userId: tokenInfo.id
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
            userId: tokenInfo.id,           // userId from token
            dishId: parseInt(dishId),       // dishId from hidden(?) in body
        }
    });
    res.json(saved);     // TODO: do I need to return anything?
};

// delete /api/saved/:id
module.exports.delete = async (req, res) => {
    const { id } = req.params;

    let tokenInfo;
    try {
        const verified = jwt.verify(req.headers['jwt-token'], process.env.JWT_SECRET);
        if (verified) {
            // Access Granted
            tokenInfo = jwt.decode(req.headers['jwt-token']);
        } else {
            // Access Denied
            return res.status(401).json({ errors: [{ 'msg': 'Improper token' }] });
        }
    } catch (err) {
        console.log(err);
        return res.status(401).json({ errors: [{ 'type': err.name, 'msg': err.message }] });
    }

    // TODO: change
    const saved = await prisma.saved.delete({
        where: {
            id: parseInt(id)
        }
    });
    res.json(saved);
};