const express = require('express')
const router = express.Router()
const { 
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUser,
    getUser
} = require('../../controllers/usersController')
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
    .get(verifyRoles("admin"), getAllUsers)
    .post(verifyRoles("admin"), createNewUser)
    .put(verifyRoles("admin"), updateUser)
    .delete(verifyRoles("admin"), deleteUser)

router.route('/:id')
    .get(verifyRoles("admin"), getUser)

module.exports = router
