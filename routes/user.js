const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// idk


// delete /api/dish/:id, deletes user and all meals associated with them
router.delete('/:id', param('id').isInt(), async (req, res) => {
    const { id } = req.params;
    const dish = await prisma.dish.delete({
        where: {
            id: parseInt(id)
        }
    });

    const meal = await prisma.meal.deleteMany({
        where: {
            userId: parseInt(id)
        }
    });

    res.json(dish);
});

module.exports = router;