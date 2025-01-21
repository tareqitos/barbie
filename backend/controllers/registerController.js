const pool = require('../config/dbConnection'); 
const bcrypt = require('bcrypt')

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
            'message': 'Password is equired'
        })
    }

    try {
        // check for duplicate username in the DB
        const query = `SELECT t_users.id_use FROM t_users WHERE email_use = $1 OR username_use = $2`; 
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
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUserQuery = `
            INSERT INTO t_users 
            (email_use, username_use, passwd_use)
            VALUES 
            ($1, $2, $3) RETURNING id_use;`
        const newUserResult = await pool.query(newUserQuery, [email, username, hashedPassword])
        //     , (err, result) => {
        //     if (err) {
        //         console.log(err.message)
        //         return res.status(500).json({ error: err.message })
        //     }
        // })
        const userId = newUserResult.rows[0].id_use;
        const newRoleQuery = `
        INSERT INTO t_roles (fkusers_rol, fkrolescodes_rol)
        VALUES
        ($1, $2);`
        const newRoleResult = await pool.query(newRoleQuery, [userId, 2])
        //     , (err, result) => {
        //     if (err) {
        //         console.log(err.message)
        //         return res.status(500).json({ error: err.message })
        //     }
        // })
        res.status(201).json({ 'success': `New user ${username} created!`})
    } catch (err) {
        res.status(500).json({ 
            'message': err.message 
        })
    }
}

module.exports = { register }
