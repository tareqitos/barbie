const Sequelize = require('sequelize');
const bcrypt = require('bcrypt')
const { Op } = Sequelize;
const Users = require('../models/t_usersModel')
const Roles = require('../models/t_rolesModel')

const register = async (req, res) => {
    const { email, username, password, verifypassword } = req.body
    if (!email) {
        return res.status(400).json({
            'status': '400',
            'message': 'Email is required'
        })
    }
    if (!username) {
        return res.status(400).json({
            'status': '400',
            'message': 'Username is required'
        })
    }
    if (!password) {
        return res.status(400).json({
            'status': '400',
            'message': 'Password is required'
        })
    } if (!verifypassword) {
        return res.status(400).json({
            'status': '400',
            'message': 'Password needs verification'
        })
    } if (verifypassword != password){
        return res.status(400).json({
            'status' : '400',
            'message' : "Passwords don't match"
        })
    }
    const duplicate = await Users.findOne({ 
        where: { 
            [Op.or]: [ 
                { email_use: email }, 
                { username_use: username } 
            ] 
        } 
    })
    if (duplicate) { 
        return res.status(409).json({
            'status': '409',
            'message': 'Email or username already registered.'
        })
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await Users.create({
            "email_use": email,
            "username_use": username,
            "passwd_use": hashedPassword
        })
        await Roles.create({
            "fkusers_rol": newUser.id_use,
            "fkrolescodes_rol": 2
        })
        res.status(201).json({
            'status' : '201',
            'success': `New user created`
        })
    } catch (err) {
        res.status(500).json({ 
            'status' : '500',
            'message': err.message 
        })
    }
}

module.exports = { register }
