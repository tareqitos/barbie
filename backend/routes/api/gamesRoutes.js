const express = require('express')
const router = express.Router()
const { getAllGames } = require('../../controllers/gamesController')
const verifyRoles = require('../../middleware/verifyRoles')

router.get('/', verifyRoles("admin"), getAllGames)

module.exports = router