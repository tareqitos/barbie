const express = require('express')
const router = express.Router()
const path = require('path')
const pool = require('../../database/db'); 

const RAWG_API = process.env.RAWG_API;

router.get('/', (req, res) => {
    pool.query("SELECT NAME_GAM FROM TGAMES;", (err, result) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({ error: err.message }); 
        }
        res.json(result.rows); 
        console.log("Ask GAME list from API request");
    })
})

module.exports = router