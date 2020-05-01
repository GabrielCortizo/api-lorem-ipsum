const { validationResult } = require('express-validator');
const BookDataAcess = require('../../data-acess/book');
const { Writer } = require('../../models/writer');

async function getBooksByISBN13(req, res) {
  const schemaErrors = validationResult(req);
  if (!schemaErrors.isEmpty()) {
    res.status(400).json(schemaErrors);
  }

  const booksSearchFields = { ...req.params, ...req.query };

  try {
    const books = await BookDataAcess.findByFields(booksSearchFields);
    res.json(books);
  } catch (err) {
    res.sendStatus(404);
  }
}

async function postBook(req, res) {
  console.log(req.body.writer_id);

  const schemaErrors = validationResult(req);
  if (!schemaErrors.isEmpty()) {
    res.status(400).json(schemaErrors);
  }

  const bookDTO = req.body;
  try {
    const book = await BookDataAcess.createBook(bookDTO);
    res.json(book);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

module.exports = { getBooksByISBN13, postBook };
