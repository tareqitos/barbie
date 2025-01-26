const express = require('express')
const router = express.Router()
const { 
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUser,
    getUser
} = require('../../controllers/usersController')
//const ROLES_LIST = require('../../config/rolesList')
//const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
    .get(getAllUsers)
    .post(createNewUser)
    .put(updateUser)
    .delete(deleteUser)

router.route('/:id')
    .get(getUser)

module.exports = router
