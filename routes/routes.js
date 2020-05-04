const express = require('express');

const userControllers = require('../controllers/user/userController');
const userControllerValidation = require('../controllers/user/validation');

const bookControllers = require('../controllers/book/bookController');
const bookControllerValidation = require('../controllers/book/validation');

const writerControllers = require('../controllers/writer/writerController');
const writerControllerValidation = require('../controllers/writer/validation');

const { authentication } = require('../middlewares/auth');

const router = express.Router();

// router.get('/getToken', generateToken);

router.post(
  '/sign-up',
  userControllerValidation.userSignUp(),
  userControllers.postSignUp
);
router.post(
  '/sign-in',
  userControllerValidation.userSignUp(),
  userControllers.postSignIn
);

router.get('/book/:isbn13', bookControllers.getBooksByISBN13);
router.post(
  '/book',
  authentication,
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
  authentication,
  writerControllerValidation.postWriter(),
  writerControllers.postWriter
);

module.exports = router;
