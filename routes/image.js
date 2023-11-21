const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/id', async (req, res) => {
    // get image

});

module.exports = router;