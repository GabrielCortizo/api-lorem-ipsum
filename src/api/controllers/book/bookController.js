const { validationResult } = require('express-validator');
const BookDataAcess = require('../../../data-acess/book');
const { Writer } = require('../../../models/writer');

async function getBooksByISBN13(req, res) {
  const schemaErrors = validationResult(req);
  if (!schemaErrors.isEmpty()) {
    return res.status(400).json(schemaErrors);
  }

  const booksSearchFields = { ...req.params };
  try {
    const books = await BookDataAcess.findByFields(booksSearchFields);
    return res.json(books);
  } catch (err) {
    return res.sendStatus(422);
  }
}

async function postBook(req, res) {
  const schemaErrors = validationResult(req);
  if (!schemaErrors.isEmpty()) {
    return res.status(400).json(schemaErrors);
  }

  const bookDTO = req.body;
  try {
    const book = await BookDataAcess.createBook(bookDTO);
    return res.status(201).json(book);
  } catch (err) {
    return res.sendStatus(422);
  }
}

module.exports = { getBooksByISBN13, postBook };
