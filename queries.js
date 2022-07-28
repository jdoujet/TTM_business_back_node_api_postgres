const Pool = require('pg').Pool
const connectionString = process.env.DATABASE_URL
const pool = new Pool({
  connectionString,
})


const getUsers = (request, response) => {
    pool.query('SELECT * FROM utilisateurs;', (error, results) => {
      if (error) {
        throw error
      }
      console.log(response.status(200).json(results.rows))
    })
  }

  module.exports = {
    getUsers
  }