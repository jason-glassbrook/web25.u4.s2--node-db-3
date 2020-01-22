const express = require ('express')

const { api : db } = require ('../../../models')

const router = express.Router ()

router.get ('/', (req, res) => {
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

router.get ('/:scheme_id', (req, res) => {
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

router.get ('/:scheme_id/steps', (req, res) => {
  const { scheme_id } = req.params

  db.schemes.getOwnSteps (scheme_id)
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

router.post ('/', (req, res) => {
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

router.post ('/:scheme_id/steps', (req, res) => {
  const stepData = req.body
  const { scheme_id } = req.params

  db.schemes.get (scheme_id)
  .then ((scheme) => {
    if (scheme) {
      db.schemes.pushOwnSteps (stepData, scheme_id)
      .then ((step) => {
        res
        .status (201)
        .json (step)
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

router.put ('/:scheme_id', (req, res) => {
  const { scheme_id } = req.params
  const changes = req.body

  db.schemes.get (scheme_id)
  .then ((scheme) => {
    if (scheme) {
      db.schemes.set (changes, scheme_id)
      .then ((scheme) => {
        res
        .status (201)
        .json (scheme)
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

router.delete ('/:scheme_id', (req, res) => {
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

module.exports = router
