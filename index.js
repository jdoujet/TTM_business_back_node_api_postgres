
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000//35355 by default for my heroku
const db = require('./queries.js')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/utilisateurs', db.getUsers)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})