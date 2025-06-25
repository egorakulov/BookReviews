/*
Test suite for testing utility functions defined in utils/*
*/

const request = require('supertest')
const { sortByNumReviews } = require('../src/utils/book');
const Book = require('../src/models/book');

function createBooks() {
    const book1 = new Book({
        title: 'The Count of Monte Cristo',
        author: 'Alexandre Dumas',
        genre: "Classic",
        isbn: '1',
        avgRating: 4.7,
        numReviews: 100,
    });
    const book2 = new Book({
        title: 'The Rise and Fall of the Dinosaurs',
        author: 'Steve Brusatte',
        genre: "Nonfiction",
        isbn: '2',
        avgRating: 4,
        numReviews: 3,
    });
    const book3 = new Book({
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: "Classic",
        isbn: '3',
        avgRating: 5.0,
        numReviews: 100,
    });
    const book4 = new Book({
        title: 'The Three Musketeers',
        author: 'Alexandre Dumas',
        genre: "Classic",
        isbn: '4',
        avgRating: 3,
        numReviews: 11,
    });
    const book5 = new Book({
        title: 'The Hunger Games',
        author: 'Suzanne Collins',
        genre: "Science Fiction",
        isbn: '5',
        avgRating: 4.75,
        numReviews: 50,
    });
    const books = [book1, book2, book3, book4, book5];
    return books;
}

describe('Utility Tests', () => {
    describe('Book Utils', () => {
        it('sortByNumReviews', async() => {
            const books = createBooks();
            const sorted = sortByNumReviews(books);
            const answer = [books[2], books[0], books[4], books[3], books[1]];
            expect(sorted).toStrictEqual(answer);
        });
    });
});