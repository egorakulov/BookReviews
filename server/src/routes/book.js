/*
Connecting routes to the functions defined in services/book.js
*/

const express = require('express');
const { addBook, editBook } = require('../services/book');

const router = express.Router();

// route to add a new book to database
router.post('/addBook', async(req, res) => {
    const { title, author, genre, isbn, avgRating, numReviews } = req.body;
    try {
        const book = await addBook(title, author, genre, isbn, avgRating, numReviews);
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// route to edit a book currently in the database
router.post('/editBook', async(req, res) => {
    const {isbn, title, author, genre} = req.body;
    try {
        const book = await editBook(isbn, title, author, genre);
        if (book === false) {
            res.status(404).json({error: 'No book with this ISBN currently in the database'});
        } else {
            // this book does exist in the database
            res.status(201).json(book);
        }
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
})

module.exports = router;