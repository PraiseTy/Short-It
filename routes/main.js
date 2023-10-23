const express = require('express');
const { getAllUrls, getUrl, editUrl, deleteUrl } = require('../controllers/main');
const { validateEditUrls } = require('../middleware/validateEditUrl');
const { validateUrlMiddleware } = require('../middleware/validation');

router = express.Router();

router.get('/', getAllUrls);
router.get('/:id', getUrl);
router.put('/:id', validateEditUrls, validateUrlMiddleware, editUrl);
router.delete('/:id', deleteUrl);

module.exports = router;
