const Components = require('../models/t_componentsModel')

const getAllComponents = async (req, res) => {
    try {
        const elem = await Components.findAll()
        return res.status(200).json(elem)
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: err.message }); 
    }
}

module.exports = { getAllComponents }