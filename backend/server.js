require('dotenv').config()
require('dotenv').config({ path: '../.env' });

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')

const corsOptions = require('./config/corsOptions')
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const verifyJWT = require('./middleware/verifyJWT')
const credentials = require('./middleware/credentials')

const PORT = process.env.PORT || 3000
const app = express();

app.use(logger)

app.use(credentials)

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }))

app.use(express.json());

app.use(cookieParser())

// routes setup
app.use('/', require('./routes/root'))
app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/login'))
app.use('/logout', require('./routes/logout'))

// external api routes
app.use('/games', require('./routes/games'))

app.use(verifyJWT)

app.use('/refresh', require('./routes/refresh'))
app.use('/api/users', require('./routes/api/usersRoutes'))
app.use('/api/games', require('./routes/api/gamesRoutes'))
app.use('/api/components', require('./routes/api/componentsRoutes'))

app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('json')) {
    res.json({ error: '404 Not Found' })
  } else {
    res.type('txt').send('404 Not Found')
  }
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});