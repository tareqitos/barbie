const pool = require('../database/db'); 
const bcrypt = require('bcrypt')

const handleLogin = async (req, res) => {
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
        console.log(foundUser)
        const match = await bcrypt.compare(password, foundUser.passwd_use)
        console.log(match)
        if (match) {
            // should create JWT
            res.json({
                'success': `User ${username} is logged in!`
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

module.exports = { handleLogin }