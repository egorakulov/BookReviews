/*
All the services you can do surrounding books.
  o Lookup books by name (returns all books with this name), an array
  o Lookup books by author (returns all books by this author), an array
  o Lookup books by genre (returns all books in this genre, sorted by decreasing avgRating), an array
  - Lookup books by ISBN (returns 1 book)
  - Return all books in database, sorted by numReviews, an array
  - Add new books to the database
  - Edit books in the database
*/

const Book = require('../models/book');
const { sortByNumReviews } = require('../utils/book');

/*
-----------------------------------------------------------------------------
                        ADMIN FUNCTIONS (later implementation)
-----------------------------------------------------------------------------
*/
// TODO: figure out how to make addBooks and editBooks an admin-only function
//   - Ideas: when you login as a user to the admin account, you get back a secret admin-only string
//      you then send that string with your requests for addBook, editBooks (hashed)
//      and when you receive the route, in routes/book you check if the sent string is equal to the admin string (hashed)
//      if it is continue
//      if not send back a 401 access denied

async function addBook(title, author, genre, isbn, averageRating, numReviews) {
    const book = new Book( {title, author, genre, isbn, avgRating: averageRating, numReviews});
    await book.save();
    return book;
}

/*
ISBN of a book cannot be changed. Make sure to set it correctly when adding a book to the database
Can edit everything else about a book (to fix typoes or change genres)
  - title
  - author
  - genre
Returns: Book if it was successfully updated, false otherwise
*/
async function editBook(isbn, title, author, genre) {
    const book = await Book.findOne( {isbn});
    if (!book) return false;
    book.title = title;
    book.author = author;
    book.genre = genre;
    await book.save();
    return book;
}

/*
-----------------------------------------------------------------------------
                        CLIENT FUNCTIONS
-----------------------------------------------------------------------------
*/

async function findBookByISBN(isbn) {
    return Book.findOne( {isbn});
}

/* 
Returns all books in the database, sorted by descending numReviews
Ties go to the book with the higher averageRating
Returns: an array
*/
async function getAllBooks() {
    const books = await Book.find();
    const sorted = sortByNumReviews(books);
    return sorted;
}

/*
Returns all books in the database LIKE the given title
Sorted by descending numReviews, with ties going to the book with higher averageRating
Returns: an array
*/
async function getBooksByTitle(title) {
    const regex = new RegExp(title, 'i');
    const books = await Book.find( {title: regex }).exec();
    const sorted = sortByNumReviews(books);
    return sorted;
}

/*
Returns all books in the database with LIKE the given author
Sorted by descending numReviews, with ties going to the book with higher averageRating
Returns: an array
*/
async function getBooksByAuthor(author) {
    const regex = new RegExp(author, 'i');
    const books = await Book.find({ author: regex }).exec();
    const sorted = sortByNumReviews(books);
    return sorted;
}

/*
Returns all books in the database with the given genre
Sorted by descending numReviews, with ties going to the book with higher averageRating
Returns: an array
*/
async function getBooksByGenre(genre) {
    const regex = new RegExp(genre, 'i');
    const books = await Book.find({ genre: regex}).exec();
    const sorted = sortByNumReviews(books);
    return sorted;
}

module.exports = { addBook, editBook, findBookByISBN, getAllBooks, getBooksByTitle, getBooksByAuthor, getBooksByGenre };