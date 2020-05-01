const { body } = require('express-validator');

exports.postBook = () => {
  return [
    body('name', 'name is a required field and must be a String')
      .exists()
      .isString(),
    body('isbn13', 'isbn13 is a required field and must be a String')
      .exists()
      .isString(),
    body('writer', 'writer is a required field and must be a String')
      .exists()
      .isString(),
    body('genres', 'genres is a required field, and must be a non empty Array')
      .exists()
      .isArray()
      .notEmpty(),
    body('publish_date', 'publish date is required').exists(),
  ];
};
