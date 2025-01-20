const pool = require('../database/db'); 

const getAllGames = (req, res) => {
    pool.query("SELECT NAME_GAM FROM TGAMES;", (err, result) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({ error: err.message }); 
        }
        res.json(result.rows); 
        console.log("Ask GAME list from API request");
    })
}

module.exports = { getAllGames }