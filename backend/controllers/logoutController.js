const pool = require('../database/db'); 

const handleLogout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.sendStatus(204)
    }
    const refreshToken = cookies.jwt

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.sendStatus(204)
}

module.exports = { handleLogout }
