const express = require('express')
const router = express.Router()
const usersController = require('../../controllers/usersController')
//const ROLES_LIST = require('../../config/rolesList')
//const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser)

router.route('/:id')
    .get(usersController.getUser)

module.exports = router
