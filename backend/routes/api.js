const express = require('express')
const router = express.Router()
const path = require('path')

const pool = require('../database/db'); 
const body = require('body-parser');

router.use(body.json());

const RAWG_API = process.env.RAWG_API;

router.get('/', (req, res) => {
    res.send('Hello World API')
})
 
router.get("/api/games", async (req, res) => {
    const page = req.query.page || 1;
    console.log("RAWG_API:", process.env.RAWG_API)
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${RAWG_API}&dates=2019-01-01,2025-01-01&platforms=4&page=${page}`
      );
      const result = await response.json();
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

// router.get("/api/games", (req, res) => {
//     pool.query("SELECT NAME_GAM FROM TGAMES;", (err, result) => {
//         if (err) {
//             console.log(err.message);
//             return res.status(500).json({ error: err.message }); 
//         }
//         res.json(result.rows); 
//         console.log("Ask GAME list from API request");
//     })
// })

router.get("/api/users", (req, res) => {
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

router.get("/api/components", (req, res) => {
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

module.exports = router