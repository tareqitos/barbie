const pool = require('../database/db'); 

const getAllComponents = (req, res) => {
    pool.query(`
        SELECT
        tcomponents.id_comp, 
        tcomponents.serial_comp, 
        ttypes.name_typ
        FROM tcomponents 
        INNER JOIN ttypes ON tcomponents.fktypes_comp = ttypes.id_typ;`, (err, result) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({ error: err.message }); 
        }
        res.json(result.rows); 
        console.log("Ask COMPONENTS list from API request");
    })
}

module.exports = { getAllComponents }