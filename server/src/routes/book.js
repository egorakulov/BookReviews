/*
Connecting routes to the functions defined in services/book.js
*/

const express = require('express');
const { addBook, editBook, findBookByISBN, getAllBooks, getBooksByTitle, getBooksByAuthor, getBooksByGenre } = require('../services/book');

const router = express.Router();

// route to add a new book to database
router.post('/addBook', async(req, res) => {
    const { title, author, genre, isbn, avgRating, numReviews } = req.body;
    try {
        // check if this isbn already exists. if it does, return an error
        const check = await findBookByISBN(isbn);
        if (check) {
            res.status(422).json({error: 'Already have a book with this isbn in the database'});
        } else {
            const book = await addBook(title, author, genre, isbn, avgRating, numReviews);
            res.status(201).json(book);
        }
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

// route to find a book by ISBN
router.get('/isbn/:isbn', async(req, res) => {
    const { isbn } = req.params;
    try {
        const book = await findBookByISBN(isbn);
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({error: 'No book with this ISBN currently in the database'});
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// route to find all books in database
router.get('/allBooks', async(req, res) => {
    try {
        const books = await getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
});

// route to find books by title
router.get('/title/:title', async(req, res) => {
    const { title } = req.params;
    try {
        const books = await getBooksByTitle(title);
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// route to find books by author
router.get('/author/:author', async(req, res) => {
    const { author } = req.params;
    try {
        const books = await getBooksByAuthor(author);
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
});

// route to find books by genre
router.get('/genre/:genre', async(req, res) => {
    const { genre } = req.params;
    try {
        const books = await getBooksByGenre(genre);
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

module.exports = router;