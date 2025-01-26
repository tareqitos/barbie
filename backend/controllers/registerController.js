const Sequelize = require('sequelize');
const bcrypt = require('bcrypt')
const { Op } = Sequelize;
const Users = require('../models/t_usersModel')
const Roles = require('../models/t_rolesModel')

const register = async (req, res) => {
    const { email, username, password } = req.body
    if (!email) {
        return res.status(400).json({
            'message': 'Email is required'
        })
    }
    if (!username) {
        return res.status(400).json({
            'message': 'Username is required'
        })
    }
    if (!password) {
        return res.status(400).json({
            'message': 'Password is required'
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
            'message': 'Email or username already register'
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
            'success': `New user created`
        })
    } catch (err) {
        res.status(500).json({ 
            'message': err.message 
        })
    }
}

module.exports = { register }
