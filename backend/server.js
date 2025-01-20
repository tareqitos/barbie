const path = require("path")
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')

require("dotenv").config({ path: "../.env" });
const RAWG_API = process.env.RAWG_API;
const PORT = process.env.PORT || 3000
const app = express();

app.use(logger)

const whitelist = ['http://localhost', 'http://127.0.0.1']
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by cors'))
    }
  },
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions)); // Enable CORS for all routes

app.use(express.urlencoded({ extended: false }))
app.use(express.json()); // Middleware to parse JSON requests
app.use(express.static(path.join(__dirname, '/public')))

//console.log("RAWG_API:", process.env.RAWG_API);

app.get('/', (req, res) => {
  res.send('Hello World')
})

async function getGameData() {
  app.get("/games", async (req, res) => {
    const page = req.query.page || 1;
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
}

getGameData();

app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ error: "404 Not Found" })
  } else {
    res.type('txt').send("404 Not Found")
  }
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
