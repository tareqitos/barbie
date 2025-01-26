const Games = require('../models/t_gamesModel')

const getAllGames = async (req, res) => {
    try {
        const elem = await Games.findAll()
        return res.status(200).json(elem)
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: err.message }); 
    }
}

module.exports = { getAllGames }