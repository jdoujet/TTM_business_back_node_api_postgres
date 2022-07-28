const Pool = require('pg').Pool
const connectionString = process.env.DATABASE_URL
console.log(process.env.DATABASE_URL)
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false}
})


const getUsers = (request, response) => {
    pool.query('SELECT * FROM utilisateurs;', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

 /* const { Client } = require('pg');

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  
  client.connect();
  const getUsers = (request, response) => {
    client.query('SELECT * FROM utilisateurs;', (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
        console.log(JSON.stringify(row));
        }
        client.end();
    });
  }
*/
  module.exports = {
    getUsers
  }