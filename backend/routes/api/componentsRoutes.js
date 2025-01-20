const express = require('express')
const router = express.Router()
const componentsController = require('../../controllers/componentsController')

router.get('/', componentsController.getAllComponents)

module.exports = router