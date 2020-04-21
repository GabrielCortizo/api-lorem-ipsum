const express = require('express');
const bookControllers = require('../controllers/bookController');
const writerControllers = require('../controllers/writerController');

const router = express.Router();

router.get('/book', bookControllers.getBook);
router.post('/book', bookControllers.postBook);

router.get('/writer', writerControllers.getWriter);
router.post('/writer', writerControllers.postWriter);

module.exports = router;
