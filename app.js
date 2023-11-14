const express = require('express')
const app = express()
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const userRouter = require('./routes/user');
const mealRouter = require('./routes/meal');
const dishRouter = require('./routes/dish');

app.use(cors())

app.use('/api/user', userRouter);
app.use('/api/meal', mealRouter);
app.use('/api/dish', dishRouter);

app.listen(3000)