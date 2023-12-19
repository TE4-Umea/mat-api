require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const helmet = require('helmet');
const bodyParser = require('body-parser');

const userRouter = require('./routes/user');
const mealRouter = require('./routes/meal');
const dishRouter = require('./routes/dish');
const imageRouter = require('./routes/image');
const savedRouter = require('./routes/saved');
const categoryRouter = require('./routes/category');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());
app.use(helmet());

app.use('/api/user', userRouter);
app.use('/api/meal', mealRouter);
app.use('/api/dish', dishRouter);
app.use('/api/img', imageRouter);
app.use('/api/saved', savedRouter);
app.use('/api/category', categoryRouter);

module.exports = app;