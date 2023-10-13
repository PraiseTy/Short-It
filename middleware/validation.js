const { body, validationResult } = require('express-validator');
const statusCodes = require('http-status-code');

const validateUrl = [
  body('originalUrl')
    .isURL({ protocols: ['http', 'https'], require_tld: true, require_protocol: false })
    .withMessage('Invalid URL format ')
];

const validateUrlMiddleware = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log('Validation successful');
  next();
};

module.exports = {
  validateUrl,
  validateUrlMiddleware
};
