/* 
Review Model
*/

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectID, ref: 'User', required: true, unique: true},
    bookID: {type: mongoose.Schema.Types.ObjectID, ref: 'Book', required: true, unique: true},
    contents: {type: String, required: true},
    rating: {type: Number, required: true},
});

// create user model from schema
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;