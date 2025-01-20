const path = require("path")
const express = require("express");
const cors = require("cors");

const corsOptions = require('./config/corsOptions')
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')

require("dotenv").config({ path: "../.env" });
const PORT = process.env.PORT || 3000
const app = express();

app.use(logger)

app.use(cors(corsOptions)); // Enable CORS for all routes

app.use(express.urlencoded({ extended: false }))

app.use(express.json()); // Middleware to parse JSON requests

// static file
app.use('/', express.static(path.join(__dirname, '/static')))

// routes setup
app.use('/', require('./routes/root'))
app.use('/register', require('./routes/register'))
app.use('/games', require('./routes/games'))
app.use('/api/users', require('./routes/api/usersRoutes'))
app.use('/api/games', require('./routes/api/gamesRoutes'))
app.use('/api/components', require('./routes/api/componentsRoutes'))

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