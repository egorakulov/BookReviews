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

async function add5Books() {
    const book1 = new Book({
        title: 'The Count of Monte Cristo',
        author: 'Alexandre Dumas',
        genre: "Classic",
        isbn: '1',
        avgRating: 4.7,
        numReviews: 100,
    });
    await book1.save();
    const book2 = new Book({
        title: 'The Rise and Fall of the Dinosaurs',
        author: 'Steve Brusatte',
        genre: "Nonfiction",
        isbn: '2',
        avgRating: 4,
        numReviews: 3,
    });
    await book2.save();
    const book3 = new Book({
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: "Classic",
        isbn: '3',
        avgRating: 5.0,
        numReviews: 100,
    });
    await book3.save();
    const book4 = new Book({
        title: 'The Three Musketeers',
        author: 'Alexandre Dumas',
        genre: "Classic",
        isbn: '4',
        avgRating: 3,
        numReviews: 11,
    });
    await book4.save();
    const book5 = new Book({
        title: 'The Hunger Games',
        author: 'Suzanne Collins',
        genre: "Science Fiction",
        isbn: '5',
        avgRating: 4.75,
        numReviews: 50,
    });
    await book5.save();
}

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
    it('Adding books to database with same ISBN', async () => {
        const response1 = await request(app).post('/books/addBook').send( {
            title: 'The Count of Monte Cristo',
            author: 'Alexandre Dumas',
            genre: 'Classic', 
            isbn: '1',
            avgRating: 5.0,
            numReviews: 100
        });
        expect(response1.status).toBe(201);
        expect(response1.body.title).toBe('The Count of Monte Cristo');
        expect(response1.body.author).toBe('Alexandre Dumas');
        expect(response1.body.genre).toBe('Classic');
        expect(response1.body.isbn).toBe('1');
        expect(response1.body.avgRating).toBe(5.0);
        expect(response1.body.numReviews).toBe(100);

        const response2 = await request(app).post('/books/addBook').send({
            title: 'No',
            author: 'No',
            genre: 'No',
            isbn: '1',
            avgRating: 0,
            numReviews: 0,
        });
        expect(response2.status).toBe(422);
    })
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
    it('Attempt to edit books not in the database', async () => {
        const response = await request(app).post('/books/editBook').send({
            title: '1984',
            author: 'George Orwell',
            genre: 'dystopian classic',
            isbn: '16328271'
        });
        expect(response.status).toBe(404);
    });
    // Test finding books by ISBN
    it('Find book by ISBN, in database', async () => {
        await add5Books();
        const response = await request(app).get('/books/isbn/5');
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('The Hunger Games');
        expect(response.body.author).toBe('Suzanne Collins');
        expect(response.body.genre).toBe('Science Fiction');
        expect(response.body.isbn).toBe('5');
        expect(response.body.avgRating).toBe(4.75);
        expect(response.body.numReviews).toBe(50);
    });
    it('Find book by ISBN, not in database', async () => {
        await add5Books();
        const response = await request(app).get('/books/isbn/6');
        expect(response.status).toBe(404);
    });
    // Test returning all books in the database
    // should be sorted by numReviews, descending order
    it('Get all books from empty database', async () => {
        const response = await request(app).get('/books/allBooks');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(0);
    });
    it('Get all books from non-empty database', async () => {
        await add5Books();
        const response = await request(app).get('/books/allBooks');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(5);
        expect(response.body[0].title).toBe("The Great Gatsby");
        expect(response.body[2].title).toBe("The Hunger Games");
        expect(response.body[4].title).toBe("The Rise and Fall of the Dinosaurs");
    });
});