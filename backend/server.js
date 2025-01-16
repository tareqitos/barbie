const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

const CLIENT_ID = process.env.IGDB_CLIENT;
const CLIENT_SECRET = process.env.IGDB_SECRET;
let token;
const body = 'fields name,release_dates.*,cover.*,genres.*; where name = "Halo 5: Guardians";';

async function getToken() {
  const token_url = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`;
  const response = await fetch(token_url, { method: "POST" });
  const result = await response.json();
  console.log(result.access_token);
  return result.access_token;
}

async function getData() {
  const token = await getToken();
  console.log(token);
  const url = "https://api.igdb.com/v4/games";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Client-ID": CLIENT_ID,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: body
  });

  const data = await response.json();
  console.log(data);
}

app.get('/games', (req, res) => {
  const data = getData();
  res.json(data);
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
