const { Pool } = require('pg'); 

const pool = new Pool({ 
    user: 'mohamed', 
    host: 'localhost', 
    database: 'barbie', 
    port: 5432, 
}); 

pool.connect((err) => { 
    if (err) { 
        return console.error('Error', err.stack); 
    } 
    console.log('Connect to the database'); 
}); 

module.exports = pool;