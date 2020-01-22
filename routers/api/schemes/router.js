const express = require ('express')

const { api : db } = require ('../../../models')

const router = express.Router ()

/***************************************
  route /
----------------------------------------
  - GET -> db.schemas.getAll
  - POST -> db.schemas.push
***************************************/

router.route ('/')
.get ((req, res) => {
  db.schemes.getAll ()
  .then ((schemes) => {
    res.json (schemes)
  })
  .catch ((error) => {
    res
    .status (500)
    .json ({ message : 'Failed to get schemes' })
  })
})
.post ((req, res) => {
  const schemeData = req.body

  db.schemes.push (schemeData)
  .then ((scheme) => {
    res
    .status (201)
    .json (scheme)
  })
  .catch ((error) => {
    res
    .status (500)
    .json ({ message : 'Failed to create new scheme' })
  })
})

/***************************************
  route /:scheme_id
----------------------------------------
  - GET -> db.schemas.get
  - PUT -> db.schemas.set
  - DELETE -> db.schemas.pull
***************************************/

router.route ('/:scheme_id')
.get ((req, res) => {
  const { scheme_id } = req.params

  db.schemes.get (scheme_id)
  .then ((scheme) => {
    if (scheme) {
      res.json (scheme)
    } else {
      res
      .status (404)
      .json ({ message : 'Could not find scheme with given id.' })
    }
  })
  .catch ((error) => {
    res
    .status (500)
    .json ({ message : 'Failed to get schemes' })
  })
})
.put ((req, res) => {
  const { scheme_id } = req.params
  const changes = req.body

  db.schemes.get (scheme_id)
  .then ((scheme) => {
    if (scheme) {
      db.schemes.set (scheme_id, changes)
      .then ((scheme) => {
        res
        .status (201)
        .json (scheme)
      })
      .catch ((error) => {
        res
        .status (500)
        .json ({ message : 'Failed to update scheme' })
      })
    }
    else {
      res
      .status (404)
      .json ({ message : 'Could not find scheme with given id' })
    }
  })
  .catch ((error) => {
    res
    .status (500)
    .json ({ message : 'Failed to update scheme' })
  })
})
.delete ((req, res) => {
  const { scheme_id } = req.params

  db.schemes.pull (scheme_id)
  .then ((scheme) => {
    if (scheme) {
      res
      .status (200)
      .json (scheme)
    }
    else {
      res
      .status (404)
      .json ({ message : 'Could not find scheme with given id' })
    }
  })
  .catch ((error) => {
    res
    .status (500)
    .json ({ message : 'Failed to delete scheme' })
  })
})

/***************************************
  route /:scheme_id/steps
----------------------------------------
  - GET -> db.schemas.ownSteps.getAll
  - POST -> db.schemas.ownSteps.push
***************************************/

router.route ('/:scheme_id/steps')
.get ((req, res) => {
  const { scheme_id } = req.params

  db.schemes.ownSteps.getAll (scheme_id)
  .then ((steps) => {
    if (steps.length) {
      res.json (steps)
    } else {
      res
      .status (404)
      .json ({ message : 'Could not find steps for given scheme' })
    }
  })
  .catch ((error) => {
    res
    .status (500)
    .json ({ message : 'Failed to get steps' })
  })
})
.post ((req, res) => {
  const stepData = req.body
  const { scheme_id } = req.params

  db.schemes.get (scheme_id)
  .then ((scheme) => {
    if (scheme) {
      db.schemes.ownSteps.push (stepData, scheme_id)
      .then ((step) => {
        res
        .status (201)
        .json (step)
      })
      .catch ((error) => {
        res
        .status (500)
        .json ({ message : 'Failed to create new step' })
      })
    }
    else {
      res
      .status (404)
      .json ({ message : 'Could not find scheme with given id.' })
    }
  })
  .catch ((error) => {
    res
    .status (500)
    .json ({ message : 'Failed to create new step' })
  })
})

/**************************************/

module.exports = router
