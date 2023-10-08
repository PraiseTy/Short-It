const express = require('express')
const { createShortUrl, customShortUrl} = require('../controllers/urls')

router = express.Router()

router.post('/shorten', createShortUrl)
router.post('/', customShortUrl)

module.exports = router