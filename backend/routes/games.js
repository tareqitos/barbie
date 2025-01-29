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
      `https://api.rawg.io/api/games?key=${RAWG_API}&dates=${date}&page=${page}&genres=${genre}`
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
  

  try {
    const response = await fetch(`https://api.rawg.io/api/games/${slug}?key=${RAWG_API}`);
    const result = await response.json();

    const platforms = result.platforms;
    result.requirements = {min: null, reco: null}

    platforms.forEach((element) => {
      if (element.platform.id == 4) {
        let req = element.requirements;

        if (req.minimum) {
          const new_min_req = extractRequirements(req.minimum);
          result.requirements.min = new_min_req;
        }

        if (req.recommended) {
          const new_reco_req = extractRequirements(req.recommended);
          result.requirements.reco = new_reco_req;
        }

      }
    })

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error, could not retrieve the game.");
  }
});

router.get("/search/:query", async (req, res) => {
  const query = req.params.query;

  try {
    const response = await fetch(`https://api.rawg.io/api/games?key=${RAWG_API}&${query}&platforms=4`);
    const result = await response.json();

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error, could not retrieve the game.");
  }
});

function extractRequirements(input) {
  const requirements = {};

  // Normalize line breaks and remove excessive whitespace
  input = input.replace(/\r\n|\r|\n/g, "\n").replace(/\s+/g, " ");

  const regex = {
    os: /OS:\s*([\w\s()\d-]+)/,
    cpu: /(?:CPU|Processor):\s*([\w\s\d-,]+)/,
    ram: /(?:RAM|Memory):\s*(\d+\s*GB)/,
    gpu: /(?:GPU|Graphics):\s*([\w\s\d™®-]+(?:\sor\s[\w\s\d-]+)?)/,
    vram: /VRAM:\s*(\d+GB)/,
    directX: /DirectX:\s*Version\s*(\d+)/,
    network: /Network:\s*([\w\s]+)/,
    storage: /(?:Available Storage Space|Storage):\s*(\d+\s*(?:GB|MB))/,
    gfxSetting: /GFX Setting Game Can Be Played On:\s*(\w+)/
  };

  for (let key in regex) {
    const match = input.match(regex[key]);
    requirements[key] = match ? match[1] : null;
  }

  return requirements;
}

module.exports = router;
