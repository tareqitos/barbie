const path = require("path")
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')

require("dotenv").config({ path: "../.env" });
//const RAWG_API = process.env.RAWG_API;
const PORT = process.env.PORT || 3000
const app = express();

app.use(logger)

const whitelist = ['http://localhost', 'http://127.0.0.1', 'https://api.rawg.io/']
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

// static file
app.use('/', express.static(path.join(__dirname, '/public')))
app.use('/api', express.static(path.join(__dirname, '/public')))

// routes setup
app.use('/', require('./routes/root'))
app.use('/api', require('./routes/api'))

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
