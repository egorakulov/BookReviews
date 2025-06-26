/*
The Express Application that handles all communication.
All it does is connect to MongoDB database, and calls the correct router for the provided route
*/

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// routes
const userRouter = require('./routes/user');
const bookRouter = require('./routes/book');
// const reviewRouter = require('./routes/review');

const app = express();
app.use(cors());

// connect to the mongoDB database
mongoose.connect('mongodb://localhost:27017/integration-testing', {});

// middleware to parse JSON requests
app.use(express.json());

// set up the routes
app.use("/users", userRouter);
app.use('/books', bookRouter);
// app.use('/reviews', reviewRouter);

module.exports = app;