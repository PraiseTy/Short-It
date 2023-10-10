const express = require('express')
const { getAllUrls, getUrl, editUrl, deleteUrl } = require('../controllers/main')

router = express.Router()


router.route('/').get(getAllUrls)
router.route('/:id').get(getUrl)
router.route('/:id').put(editUrl)
router.route('/:id').delete(deleteUrl)

module.exports = router