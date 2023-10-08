const express = require('express')
const { getAllUrls, getUrl, editUrl, deleteUrl } = require('../controllers/main')

router = express.Router()


router.route('/').get(getAllUrls)
router.route('/:id').get(getUrl).put(editUrl).delete(deleteUrl)

module.exports = router