const { body } = require('express-validator');

const USER_CONSTRAINTS = {
  PASSWORD: {
    LENGTH: {
      MIN: 5,
    },
  },
  USERNAME: {
    LENGTH: {
      MIN: 5,
    },
  },
};

exports.userSignUp = () => {
  return [
    body(
      'username',
      `username must be a string of at least ${USER_CONSTRAINTS.USERNAME.LENGTH.MIN} characters`
    )
      .exists()
      .isString()
      .isLength({ min: USER_CONSTRAINTS.PASSWORD.LENGTH.MIN }),
    body(
      'password',
      `password must be a string of at least ${USER_CONSTRAINTS.PASSWORD.LENGTH.MIN} characters`
    )
      .exists()
      .isString()
      .isLength({ min: USER_CONSTRAINTS.PASSWORD.LENGTH.MIN }),
  ];
};

exports.userSignIn = () => {
  return [
    body('username', 'username is a required field of type string')
      .exists()
      .isString(),
    body('password', 'password is a required field of type string')
      .exists()
      .isString(),
  ];
};
