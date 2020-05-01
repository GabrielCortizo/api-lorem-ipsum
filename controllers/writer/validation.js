const { body, param } = require('express-validator');

exports.postWriter = () => {
  return [
    body('name', 'name is a required field and must be a String')
      .exists()
      .isString(),
    body('birth', 'isbn13 is a required field and must be a String').exists(),
    body('genres', 'genres is a required field, and must be a non empty Array')
      .exists()
      .isArray()
      .notEmpty(),
  ];
};

exports.getWriter = () => {
  return [
    param('id', 'name is a required field and must be a String').exists(),
  ];
};
