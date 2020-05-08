const request = require('supertest');
const { connectToMockedDatabase } = require('../utils/database');
const app = require('../../src/app');
const { generateNewToken } = require('../../src/middlewares/auth');
const writerDataAcess = require('../../src/data-acess/writer');
const bookDataAcess = require('../../src/data-acess/book');

describe('Book Controllers', () => {
  let dbConnection;
  let authToken;
  let writerDatabaseEntry;

  beforeAll(async () => {
    dbConnection = await connectToMockedDatabase();
    authToken = generateNewToken();

    const writer = {
      name: 'username',
      genres: ['genres'],
    };

    writerDatabaseEntry = await writerDataAcess.createWriter(writer);
  });

  afterAll(async () => {
    afterAll(async () => {
      await dbConnection.close();
    });
  });

  const book = {
    name: 'bookname',
    isbn13: '3233-232',
    genres: ['genres'],
    writer_id: 'writer_id_r',
    description: 'description',
    publish_date: new Date(),
  };

  describe("When a post book request it's done with invalid fields", () => {
    describe('When a post book requet has no book name', () => {
      it('Should return a Bad Reques Status Code(400)', async () => {
        const response = await request(app)
          .post('/book')
          .set('Authorization', `Bearer ${authToken}`)
          .send({
            isbn13: book.isbn13,
            genres: book.genres,
            publish_date: book.publish_date,
            description: book.description,
            writer_id: writerDatabaseEntry._id,
          });

        expect(response.status).toBe(400);
      });
    });

    describe('When a post book requet has no writer_id', () => {
      it('Should return a Bad Reques Status Code(400)', async () => {
        const response = await request(app)
          .post('/book')
          .set('Authorization', `Bearer ${authToken}`)
          .send({
            name: book.name,
            isbn13: book.isbn13,
            genres: book.genres,
            description: book.description,
            writer_id: writerDatabaseEntry._id,
          });

        expect(response.status).toBe(400);
      });
    });

    describe('When a post book requet has no isnb13', () => {
      it('Should return a Bad Reques Status Code(400)', async () => {
        const response = await request(app)
          .post('/book')
          .set('Authorization', `Bearer ${authToken}`)
          .send({
            name: book.name,
            writer_id: writerDatabaseEntry._id,
            genres: book.genres,
            description: book.description,
          });

        expect(response.status).toBe(400);
      });
    });
  });

  describe('When a post book request does not have authentication token', () => {
    it('Should return a non authorized status code(401)', async () => {
      const response = await request(app).post('/book').send(book);

      expect(response.status).toBe(401);
    });
  });

  describe('When the writer_id does not match with any writer_id entry in the database', () => {
    it('Should return a bad request status code(400)', async () => {
      const response = await request(app)
        .post('/book')
        .set('Authorization', `Bearer ${authToken}`)
        .send(book);

      expect(response.status).toBe(422);
    });
  });

  describe('When a post book request has valid format and auth token', () => {
    it('Should return a crated status code(201)', async () => {
      const response = await request(app)
        .post('/book')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ ...book, writer_id: writerDatabaseEntry._id });

      expect(response.status).toBe(201);
    });
  });

  describe('When in a get book request, params does not match with a database book entry', () => {
    let bookID;
    beforeEach(async () => {
      const bookEntry = await bookDataAcess.createBook({
        ...book,
        writer_id: writerDatabaseEntry._id,
      });

      bookID = bookEntry._id;
    });

    afterEach(async () => {
      await bookDataAcess.deleteBookByID(bookID);
    });

    it('Should return an empty array in body response', async () => {
      const response = await request(app).get('/book/:323fasd3');
      const emptyArray = [];

      expect(response.body).toMatchObject(emptyArray);
    });
  });

  describe('When in a get book request, params match with a database entry', () => {
    let bookID;
    beforeEach(async () => {
      const bookEntry = await bookDataAcess.createBook({
        ...book,
        writer_id: writerDatabaseEntry._id,
      });

      bookID = bookEntry._id;
    });

    afterEach(async () => {
      await bookDataAcess.deleteBookByID(bookID);
    });

    it('Should return an non empty array in body response', async () => {
      const response = await request(app).get(`/book/${book.isbn13}`);

      expect(response.status).toBe(200);
    });
  });
});
