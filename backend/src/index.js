const express = require('express'); 
const app = express();
const port = 3000;
const pool = require('./db'); 
const body = require('body-parser');

app.use(body.json());

app.get("/", (req, res) => {
    res.status(201).send({ message: "hello world"})
    console.log("hello world")
})

app.get("/api/games", (req, res) => {
    pool.query("SELECT NAME_GAM FROM TGAMES;", (err, result) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({ error: err.message }); 
        }
        res.json(result.rows); 
        console.log("Ask GAME list from API request");
    })
})

app.get("/api/users", (req, res) => {
    pool.query(`
        SELECT
        tusers.id_use, 
        tusers.email_use, 
        tusers.username_use, 
        troles.name_rol 
        FROM tusers 
        INNER JOIN troles ON tusers.fkroles_use = troles.id_rol;`, (err, result) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({ error: err.message }); 
        }
        res.json(result.rows); 
        console.log("Ask USER list from API request");
    })
})

app.get("/api/components", (req, res) => {
    pool.query(`
        SELECT
        tcomponents.id_comp, 
        tcomponents.serial_comp, 
        ttypes.name_typ
        FROM tcomponents 
        INNER JOIN ttypes ON tcomponents.fktypes_comp = ttypes.id_typ;`, (err, result) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({ error: err.message }); 
        }
        res.json(result.rows); 
        console.log("Ask COMPONENTS list from API request");
    })
})

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

app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})