const express = require('express'); 
const app = express();
const pool = require('./db'); 
const body = require('body-parser');

app.use(body.json());

app.post("/login", (req, res) => {
    const { username, passwd } = req.body; 
    if (!username || !passwd) { 
        return res.status(400).json({ 
            error: "username or password is missing in the request." 
        }); 
    } 
    pool.query(`SELECT 
        tusers.id_use, 
        tusers.email_use, 
        tusers.username_use, 
        troles.name_rol, 
        tusers.passwd_use 
        FROM tusers 
        INNER JOIN troles ON tusers.fkroles_use = troles.id_rol 
        WHERE tusers.username_use = $1 AND tusers.passwd_use = $2; `, [username, passwd], (err, result) => { 
            if (err) { 
                console.log(err.message); 
                return res.status(500).json({ error: err.message }); 
            } if (result.rows.length === 0) { 
                return res.json({ identified: false }); 
            } else {
                const user = result.rows[0];
                console.log(user)
                return res.json({ identified: true, username: user.username_use, role: user.name_rol })
            }
    })
})
