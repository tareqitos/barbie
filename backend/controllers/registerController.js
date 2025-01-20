const pool = require('../database/db'); 
const bcrypt = require('bcrypt')
//const argon2 = require('argon2');
//const { hash } = require('crypto');

const handleNewUser = async (req, res) => {
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
            'message': 'Password is equired'
        })
    }

    try {
        // check for duplicate username in the DB
        const query = `SELECT tusers.id_use FROM tusers WHERE email_use = $1 OR username_use = $2`; 
        console.log(`Checking for duplicates with email: ${email} and username: ${username}`);
        const result = await pool.query(query, [email, username])
        // , 
        //     (err, result) => {
        //     if (err) {
        //         console.log(err.message);
        //         return res.status(500).json({ error: err.message }); 
        //     }
        // })
        console.log(`Duplicate check result: ${JSON.stringify(result.rows)}`);

        const duplicate = result.rowCount > 0;
        if (duplicate) {
            return res.status(409).json({ 'message': 'Email or username already exists' }); 
            // 409 = conflict
        }
        const hashedPassword = await bcrypt.hash(password, 10) // check maybe use argon2
        console.log(hashedPassword)
        const newQuery = `
            INSERT INTO tusers (email_use, username_use, passwd_use)
            VALUES ($1, $2, $3)`
        const newUser = await pool.query(newQuery, [email, username, hashedPassword], (err, result) => {
            if (err) {
                console.log(err.message)
                return res.status(500).json({ error: err.message })
            }
        })
        console.log(newUser)
        res.status(201).json({ 'success': `New user ${username} created!`})
    } catch (err) {
        res.status(500).json({ 
            'message': err.message 
        })
    }
}

module.exports = { handleNewUser }
