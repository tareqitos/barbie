const Sequelize = require('sequelize');
const Users = require('../models/t_usersModel')

const logout = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.sendStatus(204)
    }
    const refreshToken = cookies.jwt

    try {
        const foundUser = await Users.findOne({
            where: { "token_use": refreshToken },
        })
        if (!foundUser) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
        }

        foundUser.refreshToken = ''
        const result = await foundUser.save()
        console.log(result)

        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
        res.sendStatus(204)
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

module.exports = { logout }
