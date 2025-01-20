const express = require('express')
const router = express.Router()
const body = require('body-parser');
const fetch = require("node-fetch");

router.use(body.json());

const RAWG_API = process.env.RAWG_API;
 
router.get("/", async (req, res) => {
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

module.exports = router