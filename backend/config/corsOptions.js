const whitelist = [
    'http://localhost', 
    'http://127.0.0.1', 
    'https://api.rawg.io/'
]

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

module.exports = corsOptions