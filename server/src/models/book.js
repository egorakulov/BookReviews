/* 
Book Model
*/

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    genre: {type: String, required: true},
    isbn: {type: String, required: true, unique: true},
    avgRating: {type: Number, required: true},
    numReviews: {type: Number, required: true},
});

// create user model from schema
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;