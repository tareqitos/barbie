const express = require('express')
const router = express.Router()
const { getAllComponents } = require('../../controllers/componentsController')
const verifyRoles = require('../../middleware/verifyRoles')

router.get('/', verifyRoles("user"), getAllComponents)

module.exports = router