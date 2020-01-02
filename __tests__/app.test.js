require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/models/User.js');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('should be able to post a new user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ email: 'test@test.test', password: 'password' })
      .then(res => {
        expect(res.header['set-cookie'][0]).toEqual(expect.stringContaining('session='));
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: 'test@test.test',
          __v: 0
        });
      });
  });
  it('can login a user with correct email and password', async() => {
    const user = await User.create({
      email: 'test@test.test',
      password: 'password'
    });

    return request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'test@test.test', password: 'password' })
      .then(res => {
        expect(res.header['set-cookie'][0]).toEqual(expect.stringContaining('session='));
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: 'test@test.test',
          __v: 0
        });
      });
  });
});
