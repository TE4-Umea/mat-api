const express = require('express');
const app = express();
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const helmet = require('helmet');

const userRouter = require('./routes/user');
const mealRouter = require('./routes/meal');
const dishRouter = require('./routes/dish');
const imageRouter = require('./routes/image');
const savedRouter = require('./routes/saved');

app.use(cors());
app.use(helmet());

app.use('/api/user', userRouter);
app.use('/api/meal', mealRouter);
app.use('/api/dish', dishRouter);
app.use('/api/img', imageRouter);
app.use('/api/saved', savedRouter);

app.listen(3000);