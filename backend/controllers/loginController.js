const pool = require('../config/dbConnection'); 
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//require('dotenv').config()

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
    try {
        const query = `SELECT * FROM tusers WHERE username_use = $1`; 
        const result = await pool.query(query, [username])
        if (result.rowCount === 0) {
            return res.sendStatus(401)
        }
        const foundUser = result.rows[0]
        // console.log(foundUser)
        const match = await bcrypt.compare(password, foundUser.passwd_use)
        if (match) {
            const accessToken = jwt.sign(
                { 
                    "username": foundUser.username_use
                },
                process.env.ACCESS_TOKEN_SECRET,
                { 
                    expiresIn: '30s'
                }
            )
            const refreshToken = jwt.sign(
                { 
                    "username": foundUser.username_use
                },
                process.env.REFRESH_TOKEN_SECRET,
                { 
                    expiresIn: '1d'
                }
            )
            // const otherUsers = 
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
            res.json({
                accessToken
            })
        } else {
            res.sendStatus(401)
        }
    } catch (err) {
        res.status(500).json({ 
            'message': err.message 
        })
    }
}

module.exports = { login }