const { getDB } = require('../util/database');

class Book {
  constructor(name, isbn13, author, genres) {
    this.name = name;
    this.isbn13 = isbn13;
    this.author = author;
    this.genres = [...genres];
  }

  async save() {
    const db = getDB();
    await db.collection('books').insertOne(this);
  }
}

module.exports = Book;
