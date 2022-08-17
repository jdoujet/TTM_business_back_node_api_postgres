const Pool = require('pg').Pool
const connectionString = process.env.DATABASE_URL
console.log(process.env.DATABASE_URL)
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false}
})


//const bcrypt = require('bcrypt')


const getUsers = (request, response) => {
    pool.query('SELECT * FROM utilisateur;', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getArticles = (request, response) => {
  pool.query('SELECT * FROM article;', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM utilisateur WHERE id_user = $1;', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getArticleById = (request, response) => {
  const id_article = parseInt(request.params.id_article)
  pool.query('SELECT * FROM article WHERE id_article = $1;', [id_article], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getSupermarcheByIdUser = (request, response) => {
    
  const id_user = parseInt(request.params.id_user)
  pool.query('SELECT DISTINCT s.* '+
    'FROM supermarche s '+
    'INNER JOIN link_utilisateur_supermarche lus ON s.id_supermarche = lus.id_supermarche AND lus.id_user = $1 ;',
  [id_user], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getBeaconByIdPlanAndIdUser = (request, response) => {
    
  const id_user = parseInt(request.params.id_user)
  const id_plan = parseInt(request.params.id_plan)
  pool.query('SELECT DISTINCT b.* '+
    'FROM beacon b '+
    'INNER JOIN link_plan_beacon lpb ON b.id_beacon = lpb.id_beacon AND lpb.id_plan = $2 '+
    'LEFT JOIN link_supermarche_plan lsp ON lpb.id_plan = lsp.id_plan '+
    'INNER JOIN link_utilisateur_supermarche lus ON lsp.id_supermarche = lus.id_supermarche AND lus.id_user = $1;',
  [id_user, id_plan], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getBeaconByIdPlanAndEtageAndIdUser = (request, response) => {
    
  const id_user = parseInt(request.params.id_user)
  const id_plan = parseInt(request.params.id_plan)
  const etage = parseInt(request.params.etage)
  pool.query('SELECT DISTINCT b.* '+
    'FROM beacon b '+
    'INNER JOIN link_plan_beacon lpb ON b.id_beacon = lpb.id_beacon '+
    'INNER JOIN plan p ON lpb.id_plan = p.id AND p.id_plan=$2 AND p.etage = $3'+
    'LEFT JOIN link_supermarche_plan lsp ON p.id = lsp.id_plan '+
    'INNER JOIN link_utilisateur_supermarche lus ON lsp.id_supermarche = lus.id_supermarche AND lus.id_user = $1 ;',
  [id_user, id_plan, etage], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getRayonByIdPlanAndIdUser = (request, response) => {
    
  const id_user = parseInt(request.params.id_user)
  const id_plan = parseInt(request.params.id_plan)

  pool.query('SELECT DISTINCT r.* '+
  'FROM rayon r '+
  'INNER JOIN link_plan_rayon lpr ON r.id_rayon = lpr.id_rayon AND lpr.id_plan = $2 '+
  'LEFT JOIN link_supermarche_plan lsp ON lpr.id_plan = lsp.id_plan '+
  'INNER JOIN link_utilisateur_supermarche lus ON lsp.id_supermarche = lus.id_supermarche AND lus.id_user = $1 ;',
  [id_user, id_plan], (error, results) => {
  if (error) {
    throw error
  }
    response.status(200).json(results.rows)
  })
}

const getRayonByIdPlanAndEtageAndIdUser = (request, response) => {
    
  const id_user = parseInt(request.params.id_user)
  const id_plan = parseInt(request.params.id_plan)
  const etage = parseInt(request.params.etage)

  pool.query('SELECT DISTINCT r.* '+
  'FROM rayon r '+
  'INNER JOIN link_plan_rayon lpr ON r.id_rayon = lpr.id_rayon '+
  'INNER JOIN plan p ON lpr.id_plan = p.id AND p.id_plan = $2 AND p.etage = $3 '+
  'LEFT JOIN link_supermarche_plan lsp ON p.id = lsp.id_plan '+
  'INNER JOIN link_utilisateur_supermarche lus ON lsp.id_supermarche = lus.id_supermarche AND lus.id_user = $1 ;',
  [id_user, id_plan, etage], (error, results) => {
  if (error) {
    throw error
  }
    response.status(200).json(results.rows)
  })
}

const getEntreeByIdPlanAndIdUser = (request, response) => {
    
  const id_user = parseInt(request.params.id_user)
  const id_plan = parseInt(request.params.id_plan)

  pool.query('SELECT DISTINCT e.* '+
    'FROM entree e '+ 
    'INNER JOIN link_plan_entree lpe ON e.id_entree = lpe.id_entree AND lpe.id_plan = $2 '+
    'INNER JOIN link_supermarche_plan lsp ON lsp.id_plan = lpe.id_plan ' +
    'INNER JOIN link_utilisateur_supermarche lus ON lsp.id_supermarche = lus.id_supermarche AND lus.id_user = $1 ;',
  [id_user, id_plan], (error, results) => {
  if (error) {
    throw error
  }
    response.status(200).json(results.rows)
  })
}

/*const getPlanByIdPlanAndEtageAndIdUser = (request, response) => {
  const id = parseInt(request.params.id)
  
  pool.query('SELECT * FROM utilisateurs WHERE id_user = $1;', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}*/

const getPlansByIdUserAndByIdSupermarche = (request, response) => {
  const id_user = parseInt(request.params.id_user);
  const id_supermarche = parseInt(request.params.id_supermarche);
  
  pool.query('SELECT DISTINCT p.* '+
  'FROM plan p '+
  'INNER JOIN link_supermarche_plan lsp ON p.id = lsp.id_plan AND lsp.id_supermarche = $2 '+
  'INNER JOIN link_utilisateur_supermarche lus ON lsp.id_supermarche = lus.id_supermarche AND lus.id_user = $1;', 
  [id_user,id_supermarche], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getArticlePhareAndIdRayonByIdSupermarche = (request, response) => {
  const id_supermarche = parseInt(request.params.id_supermarche);
  
  pool.query('SELECT DISTINCT a.id_article, r.id_rayon, a.nom_article '+
  'FROM article a '+
  'INNER JOIN rayon r ON a.id_article = r.id_article_phare '+
  'LEFT JOIN link_plan_rayon lpr ON r.id_rayon = lpr.id_rayon '+
  'INNER JOIN link_supermarche_plan lsp ON lpr.id_plan = lsp.id_plan AND lsp.id_supermarche = $1;', 
  [id_supermarche], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createRayon = (request, response) => {
    const { nom_rayon, type_rayon, longueur, largeur, image_rayon, id_article_phare, coordonnees } = request.body
    pool.query('INSERT INTO rayon (nom_rayon, type_rayon, longueur, largeur, image_rayon, id_article_phare, coordonnees) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [nom_rayon, type_rayon, longueur, largeur, image_rayon, id_article_phare, coordonnees], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`${results.rows[0].id_rayon}`)
    })
}

const createEntree = (request, response) => {
  const { longueur, largeur, coordonnees } = request.body
  pool.query('INSERT INTO entree (longueur, largeur, coordonnees) VALUES ($1, $2, $3) RETURNING *',
  [longueur, largeur, coordonnees], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`${results.rows[0].id_entree}`)
  })
}


const associateRayonWithPlan = (request, response) => {
  const { id_plan, id_rayon } = request.body
  pool.query('INSERT INTO link_plan_rayon (id_plan, id_rayon) VALUES ($1, $2) RETURNING *',
  [id_plan, id_rayon], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Rayon ID: ${results.rows[0].id_rayon} associe avec le plan ID: ${results.rows[0].id_plan}`)
  })
}

const associateEntreeWithPlan = (request, response) => {
  const { id_plan, id_entree } = request.body
  pool.query('INSERT INTO link_plan_entree (id_plan, id_entree) VALUES ($1, $2) RETURNING *',
  [id_plan, id_entree], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Entree ID: ${results.rows[0].id_entree} associe avec le plan ID: ${results.rows[0].id_plan}`)
  })
}

const updateRayon = (request, response) => {
    const id_rayon = parseInt(request.params.id_rayon)
    const { nom_rayon, type_rayon, longueur, largeur, image_rayon, coordonnees } = request.body
  
    pool.query(
      'UPDATE rayon SET nom_rayon = $1, type_rayon = $2, longueur = $3, largeur = $4, image_rayon = $5, coordonnees = $6 '+
      'WHERE id_rayon = $7',
      [nom_rayon, type_rayon, longueur, largeur, image_rayon, coordonnees, id_rayon],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Rayon avec ID: ${id_rayon} modifie`)
      }
    )
}

const updateEntree = (request, response) => {
  const id_entree = parseInt(request.params.id_entree)
  const { longueur, largeur, coordonnees } = request.body

  pool.query(
    'UPDATE entree SET longueur = $1, largeur = $2, coordonnees = $3 '+
    'WHERE id_entree = $4',
    [longueur, largeur, coordonnees, id_entree],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Entree avec ID: ${id_entree} modifie`)
    }
  )
}

const deleteRayon = (request, response) => {
    const id_rayon = parseInt(request.params.id_rayon)
  
    pool.query('DELETE FROM rayon WHERE id_rayon = $1', [id_rayon], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Rayon avec ID: ${id_rayon} supprime`)
    })
}

const deleteAssociationBetweenRayonAndPlan = (request, response) => {
  const id_plan = parseInt(request.params.id_plan)
  const id_rayon = parseInt(request.params.id_rayon)
  pool.query('DELETE FROM link_plan_rayon WHERE id_plan = $1 AND id_rayon = $2', [id_plan, id_rayon], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Association entre le rayon avec ID: ${id_rayon} et le plan avec ID: ${id_plan} supprimee`)
  })
}

const deleteEntree = (request, response) => {
  const id_entree = parseInt(request.params.id_entree)

  pool.query('DELETE FROM entree WHERE id_entree = $1', [id_entree], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Entree avec ID: ${id_entree} supprimee`)
  })
}

const deleteAssociationBetweenEntreeAndPlan = (request, response) => {
  const id_plan = parseInt(request.params.id_plan)
  const id_entree = parseInt(request.params.id_entree)
  pool.query('DELETE FROM link_plan_entree WHERE id_plan = $1 AND id_entree = $2', [id_plan, id_entree], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Association entre lentree avec ID: ${id_entree} et le plan avec ID: ${id_plan} supprimee`)
  })
}

  module.exports = {
    getUsers,
    getArticles,
    getUserById,
    getArticleById,
    getSupermarcheByIdUser,
    getBeaconByIdPlanAndIdUser,
    getBeaconByIdPlanAndEtageAndIdUser,
    getRayonByIdPlanAndIdUser,
    getRayonByIdPlanAndEtageAndIdUser,
    getEntreeByIdPlanAndIdUser,
    getPlansByIdUserAndByIdSupermarche,
    getArticlePhareAndIdRayonByIdSupermarche,
    createRayon,
    associateRayonWithPlan,
    createEntree,
    associateEntreeWithPlan,
    updateRayon,
    updateEntree,
    deleteRayon,
    deleteAssociationBetweenRayonAndPlan,
    deleteEntree,
    deleteAssociationBetweenEntreeAndPlan
  }