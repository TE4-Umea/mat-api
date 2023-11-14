const express = require('express')
const app = express()
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const usersRouter = require('./routes/users');
const mealsRouter = require('./routes/meals');
const dishesRouter = require('./routes/dishes');

app.use(cors())

app.use('/api/users', usersRouter);
app.use('/api/meals', mealsRouter);
app.use('/api/dishes', dishesRouter);

app.listen(3000)