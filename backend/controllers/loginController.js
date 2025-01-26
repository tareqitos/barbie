const Sequelize = require('sequelize');
const bcrypt = require('bcrypt')
const sequelize = require('../db/connection');
const Users = require('../models/t_usersModel')
const jwt = require('jsonwebtoken')
const Roles = require('../models/t_rolesModel')
const RolesCodes = require('../models/t_rolescodesModel')

const login = async (req, res) => {
    const { username, password } = req.body
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
    // query: 
    // select t_users.username_use, t_rolescodes.name_rol from t_users 
    // inner join t_roles on t_users.id_use = t_roles.fkusers_rol 
    // inner join t_rolescodes on fkrolescodes_rol = t_rolescodes.id_rol 
    // where username_use = 'test';
    const foundUser = await Users.findOne({ 
        where: { username_use: username },
        include: [{
            model: Roles,
            as: 'roles',
            include: [{
                model: RolesCodes,
                as: 'roleCode',
                attributes: ['name_rol']
            }]
        }]
    })
    if (!foundUser) { 
        return res.sendStatus(401)
    }
    const match = await bcrypt.compare(password, foundUser.passwd_use)
    if (match) {
        const roles = foundUser.roles.map((role) => role.roleCode.name_rol) 
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "id": foundUser.id_use,
                    "username": foundUser.username_use,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        )
        const refreshToken = jwt.sign(
            { "username": foundUser.username_use },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )
        foundUser.token_use = refreshToken
        await foundUser.save()
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 1000 * 60 * 60 * 24 }) // secure: true
        res.json({ accessToken })
    } else {
        res.sendStatus(401)
    }
}

module.exports = { login }