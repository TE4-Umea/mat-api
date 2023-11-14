const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// idk

module.exports = router;