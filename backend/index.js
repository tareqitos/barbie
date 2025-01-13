const express = require('express'); 
const app = express(); 
const pool = require('./db'); 

app.get('/', (req, res) => { 
    pool.query('SELECT * FROM TUSERS WHERE ID_USE = 1', (err, result) => { 
        if (err) { 
            return res.status(500).json({ error: err.message }); 
        } 
        res.json(result.rows); 
    }); 
}); 

app.listen(3000, () => { 
    console.log(`Server ok`);
 });