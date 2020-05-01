const express = require('express');
const bookControllers = require('../controllers/book/bookController');
const bookControllerValidation = require('../controllers/book/validation');
const writerControllers = require('../controllers/writer/writerController');
const writerControllerValidation = require('../controllers/writer/validation');

const router = express.Router();

router.get('/book/:isbn13', bookControllers.getBooksByISBN13);
router.post(
  '/book',
  bookControllerValidation.postBook(),
  bookControllers.postBook
);

router.get(
  '/writer/:id',
  writerControllerValidation.getWriter(),
  writerControllers.getWriter
);
router.post(
  '/writer',
  writerControllerValidation.postWriter(),
  writerControllers.postWriter
);

module.exports = router;
