const express = require('express')
const router = express.Router()
const { verify } = require('../controllers/verifyController')

router.post('/', verify)

module.exports = router