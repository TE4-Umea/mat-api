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

    const dishes = await prisma.dish.findMany({
        orderBy: {
            id: 'desc',
        },
        include: {
            categoryOnDish: {
                include: {
                    category: true
                }
            }
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

    const dish = await prisma.dish.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            categoryOnDish: {
                include: {
                    category: true
                }
            }
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

    const dish = await prisma.dish.findMany({
        where: {
            name: {
                contains: name
            }
        },
        orderBy: {
            id: 'desc',
        },
        include: {
            categoryOnDish: {
                include: {
                    category: true
                }
            }
        },
        take: 10,
    });
    res.json(dish);
};

// Create /api/dish
module.exports.create = async (req, res) => {
    console.log(req.body);
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }
    const { name } = req.body;

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

    const existingDish = await prisma.dish.findUnique({
        where: {
            name: name
        }
    });
    if (existingDish !== null) {
        return res.status(400).json({ errors: 'dish already exists' });
    }

    // TODO: add categoryOnDish, but how?
    const dish = await prisma.dish.create({
        data: {
            name: name,
            // desc: req.body.desc,
            // categoryOnDish: {
            //     create: [
            //         {
            //             category: {
            //                 connect: {
            //                     id: req.body.categoryId
            //                 }
            //             }
            //         }
            //     ]
            // }
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