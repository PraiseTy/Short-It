const { body, validationResult } = require('express-validator');
const { HTTP_ERRORS } = require('../constant');

const validateUrl = [
  body('originalUrl')
    .isURL({ protocols: ['http', 'https'], require_tld: true, require_protocol: false })
    .withMessage('Invalid URL format')
];

const validateUrlMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  next();
};

module.exports = {
  validateUrl,
  validateUrlMiddleware
};
