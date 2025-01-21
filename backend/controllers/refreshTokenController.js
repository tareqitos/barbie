const pool = require('../database/db'); 
const jwt = require('jsonwebtoken')
require('dotenv').config()

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.sendStatus(401)
    }
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt
    try {
        const query = `SELECT * FROM tusers WHERE username_use = $1`; 
        const result = pool.query(query, [username])
        if (result.rowCount === 0) {
            return res.sendStatus(401)
        }
        const foundUser = result.rows[0]
        // console.log(foundUser)
    } catch (err) {
        res.status(500).json({ 
            'message': err.message 
        })
    }
}

module.exports = { handleRefreshToken }