const pool = require('../database/db'); 

const getAllUsers = (req, res) => {
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
}

const createNewUser = (req, res) => {
    res.json({
        "username": req.body.username
    })
}

const updateUser = (req, res) => {
    res.json({
        "username": req.body.username
    })
}

const deleteUser = (req, res) => {
    res.json({
        "id": req.body.id
    })
}

const getUser = (req, res) => {
    const userId = req.params.id
    const query = `
        SELECT
        tusers.id_use as id, 
        tusers.username_use as username, 
        troles.name_rol as level
        FROM tusers 
        INNER JOIN troles ON tusers.fkroles_use = troles.id_rol
        WHERE tusers.id_use = $1`
    pool.query(query, [userId], (err, result) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({ error: err.message }); 
        }
        res.json(result.rows); 
        console.log("Ask USER list from API request");
    })
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getUser
}