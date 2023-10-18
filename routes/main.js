const express = require('express');
const { getAllUrls, getUrl, editUrl, deleteUrl } = require('../controllers/main');
const { validateUrl, validateUrlMiddleware } = require('../middleware/validation');

router = express.Router();

router.route('/').get(getAllUrls);
router.route('/:id').get(getUrl);
router.route('/:id').put(validateUrl, validateUrlMiddleware, editUrl);
router.route('/:id').delete(deleteUrl);

module.exports = router;
