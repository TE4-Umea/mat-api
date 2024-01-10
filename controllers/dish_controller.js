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

    const dishes = await prisma.dish.findMany({
        orderBy: {
            id: 'asc',
        },
        include: {
            // categoryOnDish: {
            //     include: {
            //         category: true
            //     }
            // },
            saved: {
                where: {
                    userId: req.tokenInfo.id
                }
            }
        },
        take: 40,
        skip: 0 + (skip * 40),
    });
    res.json(dishes);
};

// get:id /api/dish/:id
module.exports.getOne = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }
    const { id } = req.params;

    const dish = await prisma.dish.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            // categoryOnDish: {
            //     include: {
            //         category: true
            //     }
            // },
            saved: {
                where: {
                    userId: req.tokenInfo.id
                }
            }
        },
    });
    res.json(dish);
};

// Search /api/dish/search/:name
module.exports.search = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }
    const { name } = req.params;

    const dish = await prisma.dish.findMany({
        where: {
            name: {
                contains: name
            }
        },
        orderBy: {
            id: 'asc',
        },
        include: {
            // categoryOnDish: {
            //     include: {
            //         category: true
            //     }
            // },
            saved: {
                where: {
                    userId: req.tokenInfo.id
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

    const name = req.body.dish.name;
    const desc = req.body.dish.desc || null;

    const existingDish = await prisma.dish.findUnique({
        where: {
            name: name
        }
    });
    if (existingDish !== null) {
        return res.status(400).json({ errors: [{ 'msg': 'Dish Already exists' }] });
    }

    // TODO: add categoryOnDish, but how?
    const dish = await prisma.dish.create({
        data: {
            name: name,
            desc: desc,
            // doesn't work
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

    // Should someone elses past meals and saveds/favorites be deleted when I delete a dish? idk
    // delete all meals with this dishId
    // Should be before dish delete

    // const meal = await prisma.meal.deleteMany({
    //     where: {
    //         dishId: parseInt(id)
    //     }
    // });
    // const saved = await prisma.saved.deleteMany({
    //     where: {
    //         dishId: parseInt(id)
    //     }
    // });
    // const categoryOnDish = await prisma.categoryOnDish.deleteMany({
    //     where: {
    //         dishId: parseInt(id)
    //     }
    // });

    // crashes if used in something above
    const dish = await prisma.dish.delete({
        where: {
            id: parseInt(id)
        }
    });

    res.json(dish); // returns the deleted dish, kinda useless
};