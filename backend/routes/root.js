const express = require('express')
const router = express.Router()
const path = require('path')

router.use('/', (req, res) => {
    res.send('Hello World Root')
})

module.exports = router