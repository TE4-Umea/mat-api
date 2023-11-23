const { validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

// getAll /api/dish
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

    const dishes = await prisma.dish.findMany({
        orderBy: {
            id: 'desc',
        },
        take: 10,
        skip: 0 + (skip * 10),
    });
    res.json(dishes);
};

// get:id /api/dish/:id
module.exports.getOne = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }
    const { id } = req.params;

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

    const dish = await prisma.dish.findUnique({
        where: {
            id: parseInt(id)
        },
        // should you get the times you have eaten this here?
    });
    res.json(dish);
};

// Search /api/dish/search/:name
module.exports.search = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }
    const { name } = req.params;

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

    const dish = await prisma.dish.findMany({
        where: {
            name: {
                contains: name
            }
        },
        orderBy: {
            id: 'desc',
        },
        take: 10,
    });
    res.json(dish);
};

// Create /api/dish
module.exports.create = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }
    //const { name } = req.body;

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

    const dish = await prisma.dish.create({
        data: {
            name: 'testBurgare11'
        }
    });
    res.json(dish);
};

// delete /api/dish/:id
module.exports.delete = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }
    const { id } = req.params;
    const dish = await prisma.dish.delete({
        where: {
            id: parseInt(id)
        }
    });

    // Should someone elses past foods be deleted when I delete a dish? idk
    // delete all meals with this dishId
    // const meal = await prisma.meal.deleteMany({
    //     where: {
    //         dishId: parseInt(id)
    //     }
    // });

    res.json(dish); // returns the deleted dish, kinda useless
};