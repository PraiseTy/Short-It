const { body, validationResult } = require('express-validator');

const validateEditUrls = [
  body('originalUrl')
    .optional()
    .isURL({ protocols: ['http', 'https'], require_tld: true, require_protocol: false })
    .withMessage('Invalid URL format'),
  body('customName')
    .optional()
    .isLength({ min: 5 })
    .withMessage('Custom name must be at least 5 characters')
];

const editValidationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
    validateEditUrls,
    editValidationMiddleware
};
