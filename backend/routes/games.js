const express = require("express");
const router = express.Router();
const body = require("body-parser");
const fetch = require("node-fetch");

router.use(body.json());

const RAWG_API = process.env.RAWG_API;

router.get("/", async (req, res) => {
  const page = req.query.page || 1;
  const date = req.query.date;
  const genre = req.query.genre;

  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${RAWG_API}&dates=${date}&platforms=4&page=${page}&genres=${genre}`
    );
    const result = await response.json();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:slug", async (req, res) => {
  const slug = req.params.slug;
  console.log("SLUG: ", slug);

  try {
    const response = await fetch(`https://api.rawg.io/api/games/${slug}?key=${RAWG_API}`);
    const result = await response.json();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error, could not retrieve the game.");
  }
});

router.get("/search/:query", async (req, res) => {
  const query = req.params.query;
  console.log(query);

  try {
    const response = await fetch(`https://api.rawg.io/api/games?key=${RAWG_API}&search=${query}`);
    const result = await response.json();

    res.json(result)
  } catch (err) {
    console.error(error);
    res.status(500).send("Internal Server Error, could not retrieve the game.");
  }
})

module.exports = router;
