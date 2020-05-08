const request = require('supertest');
const { connectToMockedDatabase } = require('../utils/database');
const app = require('../../src/app');
const { generateNewToken } = require('../../src/middlewares/auth');
const writerDataAcess = require('../../src/data-acess/writer');

describe('Writer', () => {
  let dbConnection;
  const authToken = generateNewToken();
  beforeAll(async () => {
    dbConnection = await connectToMockedDatabase();
  });

  afterAll(async () => {
    afterAll(async () => {
      await dbConnection.close();
    });
  });

  const writer = {
    name: 'username',
    genres: ['genres'],
  };

  describe('When a post request with valid field is done without a valid token', () => {
    it('Should return an unathorized status code', async () => {
      const response = await request(app)
        .post('/writer')
        .set('Authorization', `Bearer randoom`)
        .send(writer);
      expect(response.status).toBe(401);
    });
  });

  describe('When the body request has invalid body format', () => {
    describe("When in a post request the username field doesn't exist ", () => {
      it('Should return an bad request status code', async () => {
        const response = await request(app)
          .post('/writer')
          .set('Authorization', `Bearer ${authToken}`)
          .send({ genres: writer.genres });

        expect(response.status).toBe(400);
      });
    });

    describe("When in a post request the genres field doesn't exist", () => {
      it('Should return an bad request status code', async () => {
        const response = await request(app)
          .post('/writer')
          .set('Authorization', `Bearer ${authToken}`)
          .send({ name: writer.name });

        expect(response.status).toBe(400);
      });
    });

    describe('When in a post request the genres field is an empty array', () => {
      it('Should return an bad request status code', async () => {
        const response = await request(app)
          .post('/writer')
          .set('Authorization', `Bearer ${authToken}`)
          .send({ name: writer.name, genres: [] });

        expect(response.status).toBe(400);
      });
    });
  });

  describe('When in a get request has no id params', () => {
    it('Should return a 404 status code', async () => {
      const response = await request(app).get('/writer').send();
      expect(response.status).toBe(404);
    });
  });

  describe("When in a get request the id param don't match with any database entries", () => {
    it('Should return a 404 status code', async () => {
      const response = await request(app).get('/writer/notValidID').send();
      expect(response.status).toBe(404);
    });
  });

  describe('When in a get request the id param match with a database entry', () => {
    let writerDatabaseEntry;
    beforeEach(async () => {
      writerDatabaseEntry = await writerDataAcess.createWriter(writer);
    });

    afterEach(async () => {
      await writerDataAcess.deleteByID(writerDatabaseEntry._id);
    });

    it('Should return a 200 status code', async () => {
      const response = await request(app)
        .get(`/writer/${writerDatabaseEntry._id}`)
        .send();
      expect(response.status).toBe(200);
    });
  });
});
