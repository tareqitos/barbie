const allowedHosts = require('../config/allowedHosts')

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedHosts.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true)
    }
    next()
}

module.exports = credentials