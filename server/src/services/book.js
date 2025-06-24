/*
All the services you can do surrounding books.
  - Lookup books by name (returns all books with this name), an array
  - Lookup books by author (returns all books by this author), an array
  - Lookup books by genre (returns all books in this genre, sorted by decreasing avgRating), an array
  - Lookup books by ISBN (returns 1 book)
  - Return all books in database, sorted by averageRating, an array
  - Add new books to the database
  - Edit books in the database
*/

const Book = require('../models/book');

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

module.exports = { addBook, editBook };