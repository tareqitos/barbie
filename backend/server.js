const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config({ path: "../.env" });

const app = express();
app.use(express.json()); // Middleware to parse JSON requests
app.use(cors()); // Enable CORS for all routes

console.log("RAWG_API:", process.env.RAWG_API);

const RAWG_API = process.env.RAWG_API;

async function getGameData() {
  app.get("/games", async (req, res) => {
    const response = await fetch(`https://api.rawg.io/api/games?key=${RAWG_API}`);
    const result = await response.json();

    res.json(result);
  });
}

getGameData();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
