const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const sqlFilePath = path.join(__dirname, 'setup.sql');
const sql = fs.readFileSync(sqlFilePath).toString().split(';').filter(query => query.trim() !== '');

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: 'postgres',
});

const terminateConnections = async (dbname) => {
  await client.query(`
    SELECT pg_terminate_backend(pg_stat_activity.pid)
    FROM pg_stat_activity
    WHERE pg_stat_activity.datname = '${dbname}'
      AND pid <> pg_backend_pid();
  `);
};

client.connect()
  .then(async () => {
    await terminateConnections('barbie');

    for (const query of sql) {
      try {
        await client.query(query + ';');
      } catch (err) {
        console.error('Error executing query:', err);
      }
    }
    console.log('Database created successfully.');
    return client.end();
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
    client.end();
  });