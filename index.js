
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

app.get('/utilisateur', db.getUsers)

app.get('/utilisateur/:id', db.getUserById)

app.get('/utilisateur/:id/supermarche', db.getSupermarcheByIdUser)

/*app.get('/utilisateur/:id/supermarche/:id/etage', db.getEtagesByIdSupermarcheAndIdUser)*/

app.get('/utilisateur/:id_user/supermarche/:id_supermarche/plan', db.getPlansByIdUserAndByIdSupermarche)

app.get('/utilisateur/:id_user/plan/:id_plan/etage/:etage/beacon', db.getBeaconByIdPlanAndEtageAndIdUser)

app.get('/utilisateur/:id_user/plan/:id_plan/etage/:etage/rayon', db.getRayonByIdPlanAndEtageAndIdUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})