const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/:name', async (req, res) => {
    // get image
    const name = req.params.name;
    return res.sendFile(name, { root: './public/images' });
});

module.exports = router;