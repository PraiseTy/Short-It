const express = require('express');
const { validateUrl, validateUrlMiddleware } = require('../middleware/validation');
const { createShortUrl, customShortUrl } = require('../controllers/urls');

const router = express.Router();

router.post('/shorten', validateUrl, validateUrlMiddleware, createShortUrl);
router.post('/', customShortUrl);

module.exports = router;
