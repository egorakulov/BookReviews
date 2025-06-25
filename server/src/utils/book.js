/*
Helper functions for book models
*/

const Book = require('../models/book');

/*
Sorts books by numReviews in descending order (more ratings = first)
When two books have the same numReviews, the one with a larger averageRating goes first
Returns the sorted array
*/
 function sortByNumReviews(books) {
    return [...books].sort((a, b) => {
        if (b.numReviews !== a.numReviews) {
            return b.numReviews - a.numReviews;
        }
        return b.avgRating - a.avgRating;
    });
}

module.exports = { sortByNumReviews };