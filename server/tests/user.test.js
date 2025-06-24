/*
Integration tests, that test the user routes
*/
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/app');

const User = require('../src/models/user');

const { hashPassword } = require('../src/services/user');

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
  await User.deleteMany();
});

// clean up database and close connection after all tests
afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('User API Tests', () => {
  // Test creating a new user
  it('Creating a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'Egor Akulov',
      email: 'egor@example.com',
      password: 'CharlieIsGay',
    });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Egor Akulov');
    expect(response.body.email).toBe('egor@example.com');
    expect(response.body.password).toBe(hashPassword('CharlieIsGay').toString());
  });

  // Test successful login
  it('Logging on successfully', async () => {
    const hashedPassword = hashPassword('JoEdAlE123!').toString();
    const user = new User({ name: 'Joe Dale', email: 'joe@dale.com', password: hashedPassword});
    await user.save();

    const response = await request(app).get(`/users/joe@dale.com/JoEdAlE123!`);
    expect(response.status).toBe(200);
    expect(response.body).toBe(true);
  });

  // Test unsuccessful login
  it('Logging on unsuccessfully', async () => {
    const hashedPassword = hashPassword('JoEdAlE123!').toString();
    const user = new User({ name: 'Joe Dale', email: 'joe@dale.com', password: hashedPassword});
    await user.save();

    const response1 = await request(app).get(`/users/joe@dale.com/joedale`);
    expect(response1.status).toBe(401);

    const response2 = await request(app).get(`/users/joeb@dale.com/JoEdAlE123!`);
    expect(response2.status).toBe(401);

    const response3 = await request(app).get(`/users/joeb@dale.com/joedale`);
    expect(response3.status).toBe(401);
  });

  // Test retrieving by email
  it('Retrieving user by email', async () => { 
    const user = new User({name: 'Mikey Sherlock', email: 'mikey@example.com', password: hashPassword('hello').toString()});
    await user.save();

    const response = await request(app).get(`/users/mikey@example.com`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Mikey Sherlock");
    expect(response.body.email).toBe("mikey@example.com");
    expect(response.body.password).toBe(hashPassword('hello').toString());
  })

  // Test retrieving by email when no user exists
  it('Retrieving user by email, user does not exist', async () => {
    const response = await request(app).get(`/users/doesnotexist@example.com`);
    expect(response.status).toBe(404);
  })
});