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
  
  it('will seed data for movies given number of movies', async() => {
    const numbersToCreate = { movies: 1 };
    await seedData(numbersToCreate);

    const seededMovies = await request(app).get('/api/v1/movies');

    expect(seededMovies.body).toEqual([{
      '__v': 0, 
      '_id': expect.anything(), 
      'description': expect.anything(), 
      'studio': expect.anything(), 
      'title': expect.anything() 
    }]);
  });

  it('will seed data for reviews given number of reviews', async() => {
    const numbersToCreate = { movies: 1, reviews: 2 };
    await seedData(numbersToCreate);

    const seededReviews = await request(app).get('/api/v1/reviews');

    expect(seededReviews.body).toHaveLength(2);
  });

  it('will default seed data for 5 movies', async() => {
    await seedData();

    const seededReviews = await request(app).get('/api/v1/movies');

    expect(seededReviews.body).toHaveLength(5);
  });

  it('will default seed data for 100 reviews', async() => {
    
    await seedData();

    const seededReviews = await request(app).get('/api/v1/reviews');

    expect(seededReviews.body).toHaveLength(100);
  });
});
