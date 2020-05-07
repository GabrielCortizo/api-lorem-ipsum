const request = require('supertest');
const User = require('../../../src/data-acess/user');
const { connectToMockedDatabase } = require('../../utils/database');
const userModel = require('../../../src/models/user');
const {
  USER_CONSTRAINTS,
} = require('../../../src/api/controllers/user/validation');
const app = require('../../../src/app');

describe(`Sign In`, () => {
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
        const response = await request(app).post('/sign-in').send({
          username: 'use',
          password: 'password',
        });
        expect(response.status).toBe(400);
      });
    });

    describe(`When password size is lower than ${USER_CONSTRAINTS.PASSWORD.LENGTH.MIN}`, () => {
      it(`it should return a bad request code(400)`, async () => {
        const response = await request(app).post('/sign-in').send({
          username: 'username',
          password: 'pass',
        });
        expect(response.status).toBe(400);
      });
    });
  });

  const username = 'username';
  const password = 'password';

  describe(`When the user does not exist in the database`, () => {
    it('Should return unauthorized error', async () => {
      const response = await request(app).post('/sign-in').send({
        username,
        password,
      });
      expect(response.status).toBe(401);
    });
  });

  describe('When the user exists in the database', () => {
    beforeAll(async () => {
      await User.createUser({ username, password });
    });

    afterAll(async () => {
      await userModel.findOneAndDelete({ username });
    });

    describe('When the password does not match with the one on the database', () => {
      it('Should return an aunotherized status code error', async () => {
        const response = await request(app)
          .post('/sign-in')
          .send({ username, password: `not${password}` });

        expect(response.status).toBe(401);
      });
    });

    describe('When the passwords match with the one on the database', () => {
      it('Should return an valid token', async () => {
        const response = await request(app)
          .post('/sign-in')
          .send({ username, password });

        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
      });
    });
  });
});
