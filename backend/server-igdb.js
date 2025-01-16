const express = require("express");
const fetch = require("node-fetch");
const cors = require('cors');
require('dotenv').config({path: '../.env'})


const app = express();
app.use(express.json()); // Middleware to parse JSON requests
app.use(cors()); // Enable CORS for all routes

console.log("IGDB_CLIENT:", process.env.IGDB_CLIENT);
console.log("IGDB_SECRET:", process.env.IGDB_SECRET);


const CLIENT_ID = process.env.IGDB_CLIENT;
const CLIENT_SECRET = process.env.IGDB_SECRET;
const query = `
fields name, 

platforms.versions.*, 
platforms.platform_family.*;

where release_dates.date < 1577833200000 & platforms = 6;
limit 80;
`;

async function getToken() {
  const token_url = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`;
  const response = await fetch(token_url, { method: "POST" });
  const result = await response.json();
  console.log(result);
  return result.access_token;
}

async function getData(url, query, endpoint) {
  const token = await getToken();
  console.log(token);
  const api_url = url;
 
  const response = await fetch(api_url, {
    method: "POST",
    headers: {
      "Client-ID": CLIENT_ID,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: query
  });

  const data = await response.json();
  console.log(data);

  app.get(endpoint, (req, res) => {
    res.send(data)
  })
}

getData("https://api.igdb.com/v4/games", query, '/games');

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
