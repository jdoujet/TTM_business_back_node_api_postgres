
const express = require('express')
const bodyParser = require('body-parser')
let cors = require("cors")
const app = express()
const port = process.env.PORT || 3000//35355 by default for my heroku
const db = require('./queries.js')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cors())

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/utilisateur', db.getUsers)

app.get('/utilisateur/:id_user', db.getUserById)

app.get('/utilisateur/:id_user/supermarche', db.getSupermarcheByIdUser)

app.get('/utilisateur/:id_user/plan/:id_plan/beacon', db.getBeaconByIdPlanAndIdUser)

app.get('/utilisateur/:id_user/plan/:id_plan/etage/:etage/beacon', db.getBeaconByIdPlanAndEtageAndIdUser)

app.get('/utilisateur/:id_user/plan/:id_plan/rayon', db.getRayonByIdPlanAndIdUser)

app.get('/utilisateur/:id_user/plan/:id_plan/etage/:etage/rayon', db.getRayonByIdPlanAndEtageAndIdUser)

app.get('/utilisateur/:id_user/plan/:id_plan/entree', db.getEntreeByIdPlanAndIdUser)

app.get('/utilisateur/:id_user/supermarche/:id_supermarche/plan', db.getPlansByIdUserAndByIdSupermarche)

app.get('/supermarche/:id_supermarche/rayon/article_phare', db.getArticlePhareAndIdRayonByIdSupermarche)

app.post('/rayon', db.createRayon)

app.post('/rayon/plan', db.associateRayonWithPlan)

app.post('/entree', db.createEntree)

app.post('/entree/plan', db.associateEntreeWithPlan)

app.put('/rayon/:id_rayon', db.updateRayon)

app.put('/entree/:id_entree', db.updateEntree)

app.delete('/rayon/:id_rayon', db.deleteRayon)

app.delete('/rayon/:id_rayon/plan/:id_plan', db.deleteAssociationBetweenRayonAndPlan)

app.delete('/entree/:id_entree', db.deleteEntree)

app.delete('entree/:id_entree/plan/:id_plan', db.deleteAssociationBetweenEntreeAndPlan)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})