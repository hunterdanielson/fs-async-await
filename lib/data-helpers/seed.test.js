const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
require('dotenv').config();

const request = require('supertest');
const app = require('../../lib/app');
 
const { seedData } = require('./seed');

describe('seed test', () => {
  beforeAll(async() => {
    const uri = await mongod.getUri();
    return connect(uri);
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(async() => {
    await mongoose.connection.close();
    return mongod.stop();
  });
  

  it('will seed data for movies', async() => {
    const numbersToCreate = { movies: 2, reviews: 3 };
    await seedData(numbersToCreate);

    const seededMovies = await request(app).get('/api/v1/movies');


    expect(seededMovies.body).toEqual('something');
  });
});
