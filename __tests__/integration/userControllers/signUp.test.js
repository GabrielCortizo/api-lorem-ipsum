const request = require('supertest');
const User = require('../../../src/data-acess/user');
const { connectToMockedDatabase } = require('../../utils/database');
const userModel = require('../../../src/models/user');
const {
  USER_CONSTRAINTS,
} = require('../../../src/api/controllers/user/validation');
const app = require('../../../src/app');

describe(`Sign up`, () => {
  let dbConnection;
  beforeAll(async () => {
    dbConnection = await connectToMockedDatabase();
  });

  afterAll(async () => {
    await dbConnection.close();
  });

  describe(`When the body request has invalid format`, () => {
    describe(`When username length is lower than ${USER_CONSTRAINTS.USERNAME.LENGTH.MIN}`, () => {
      it(`it should return a bad request code(400)`, async () => {
        const response = await request(app).post('/sign-up').send({
          username: 'use',
          password: 'password',
        });
        expect(response.status).toBe(400);
      });
    });

    describe(`When password size is lower than ${USER_CONSTRAINTS.PASSWORD.LENGTH.MIN}`, () => {
      it(`it should return a bad request code(400)`, async () => {
        const response = await request(app).post('/sign-up').send({
          username: 'username',
          password: 'pass',
        });
        expect(response.status).toBe(400);
      });
    });
  });

  const username = 'username';
  const password = 'password';

  describe(`When the username already exists in the database`, () => {
    beforeAll(async () => {
      await User.createUser({ username, password });
    });

    afterAll(async () => {
      await userModel.findOneAndDelete({ username });
    });

    it(`Should return an error message and the status code(Unprocessable entity) 422`, async () => {
      const response = await request(app)
        .post('/sign-up')
        .send({ username, password });

      expect(response.status).toBe(422);
      expect(response.body).toBe('Error: username already exists');
    });
  });

  describe(`When input is valid and username isn't already in use`, () => {
    it(`Should create a new user in the database and return the status Code Created(201)`, async () => {
      const response = await request(app)
        .post('/sign-up')
        .send({ username, password });
      expect(response.status).toBe(201);
    });
  });
});
