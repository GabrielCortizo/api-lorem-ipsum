const Book = require('../models/book');
const { getDB } = require('../util/database');

async function getBook(req, res) {
  const { name } = req.query;
  console.log(name);
  const db = getDB();

  try {
    const items = await db.collection('books').find({ name }).toArray();
    res.json(items);
  } catch (err) {
    res.sendStatus(500);
  }
}

function postBook(req, res) {
  const { name, isbn13, author, genres } = req.body;
  const book = new Book(name, isbn13, author, genres);

  book.save();
  res.sendStatus(200);
}

module.exports = { getBook, postBook };
