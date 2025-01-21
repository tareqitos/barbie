const { Pool } = require('pg'); 

const pool = new Pool({ 
    user: process.env.DB_USERS, 
    host: process.env.DB_HOST, 
    database: process.env.DB_DATABASE, 
    port: process.env.DB_PORT 
}); 

module.exports = pool;