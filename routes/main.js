const express = require('express');
const { getAllUrls, getUrl, editUrl, deleteUrl } = require('../controllers/main');
const { validateEditUrls, editValidationMiddleware } = require('../middleware/validateEditUrl');

router = express.Router();

router.route('/').get(getAllUrls);
router.route('/:id').get(getUrl);
router.route('/:id').put(validateEditUrls, editValidationMiddleware, editUrl);
router.route('/:id').delete(deleteUrl);

module.exports = router;
