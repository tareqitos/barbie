const allowedHosts = require('./allowedHosts')

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedHosts.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by cors'))
    }
  },
  optionsSuccessStatus: 200
}

module.exports = corsOptions