/*
Integration tests that test book routes
*/

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/app');
const Book = require('../src/models/book');

// Connect to MongoDB database before all tests
beforeAll(async() => {
  const url = `mongodb://127.0.0.1/integration_testing`;
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  await mongoose.connect(url, {});
});

// refresh database before each test
beforeEach(async () => {
  await Book.deleteMany();
});

// clean up database and close connection after all tests
afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('Book API Tests', () => {
    // Test Adding New Books
    it('Adding new books to database', async () => {
        // book 1
        const response1 = await request(app).post('/books/addBook').send( {
            title: 'The Count of Monte Cristo',
            author: 'Alexandre Dumas',
            genre: 'Classic', 
            isbn: '9780553213508',
            avgRating: 5.0,
            numReviews: 100
        });
        expect(response1.status).toBe(201);
        expect(response1.body.title).toBe('The Count of Monte Cristo');
        expect(response1.body.author).toBe('Alexandre Dumas');
        expect(response1.body.genre).toBe('Classic');
        expect(response1.body.isbn).toBe('9780553213508');
        expect(response1.body.avgRating).toBe(5.0);
        expect(response1.body.numReviews).toBe(100);

        // book 2
        const response2 = await request(app).post('/books/addBook').send({
            title: 'The Rise and Fall of Dinosaurs',
            author: 'Steve Brusatte',
            genre: 'Nonfiction', 
            isbn: '0062490427',
            avgRating: 4.1,
            numReviews: 5
        });
        expect(response2.status).toBe(201);
        expect(response2.body.title).toBe('The Rise and Fall of Dinosaurs');
        expect(response2.body.author).toBe('Steve Brusatte');
        expect(response2.body.genre).toBe('Nonfiction');
        expect(response2.body.isbn).toBe('0062490427');
        expect(response2.body.avgRating).toBe(4.1);
        expect(response2.body.numReviews).toBe(5);
    });
    // Test Editing Books
    it('Editing books currently in the database', async () => {
        const gatsby = new Book({
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            genre: 'Classic', 
            isbn: '9780743273565',
            avgRating: 5.0,
            numReviews: 1,
        });
        await gatsby.save();

        const response1 = await request(app).post('/books/editBook').send({
            title: 'Great Gatsby',
            author: 'F. Scott Fitzgerald',
            genre: 'classic',
            isbn: '9780743273565',
        });
        expect(response1.status).toBe(201);
        expect(response1.body.title).toBe('Great Gatsby');
        expect(response1.body.author).toBe('F. Scott Fitzgerald');
        expect(response1.body.genre).toBe('classic');
        expect(response1.body.isbn).toBe('9780743273565');
        expect(response1.body.avgRating).toBe(5.0);
        expect(response1.body.numReviews).toBe(1);

        const response2 = await request(app).post('/books/editBook').send({
            title: 'gatsby',
            author: 'fitz',
            genre: 'class',
            isbn: '9780743273565',
        });
        expect(response2.status).toBe(201);
        expect(response2.body.title).toBe('gatsby');
        expect(response2.body.author).toBe('fitz');
        expect(response2.body.genre).toBe('class');
        expect(response2.body.isbn).toBe('9780743273565');
        expect(response2.body.avgRating).toBe(5.0);
        expect(response2.body.numReviews).toBe(1);
    });
});