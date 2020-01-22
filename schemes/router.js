const express = require ('express')

const db = {
  'schemes' : require ('./model.js'),
}

const router = express.Router ()

router.get ('/', (req, res) => {
  db['schemes'].find ()
  .then ((schemes) => {
    res.json (schemes)
  })
  .catch ((error) => {
    res.status (500).json ({ message: 'Failed to get schemes' })
  })
})

router.get ('/:id', (req, res) => {
  const { id } = req.params

  db['schemes'].findById (id)
  .then ((scheme) => {
    if (scheme) {
      res.json (scheme)
    } else {
      res.status (404).json ({ message: 'Could not find scheme with given id.' })
    }
  })
  .catch ((error) => {
    res.status (500).json ({ message: 'Failed to get schemes' })
  })
})

router.get ('/:id/steps', (req, res) => {
  const { id } = req.params

  db['schemes'].findSteps (id)
  .then ((steps) => {
    if (steps.length) {
      res.json (steps)
    } else {
      res.status (404).json ({ message: 'Could not find steps for given scheme' })
    }
  })
  .catch ((error) => {
    res.status (500).json ({ message: 'Failed to get steps' })
  })
})

router.post ('/', (req, res) => {
  const schemeData = req.body

  db['schemes'].add (schemeData)
  .then ((scheme) => {
    res.status (201).json (scheme)
  })
  .catch ((error) => {
    res.status (500).json ({ message: 'Failed to create new scheme' })
  })
})

router.post ('/:id/steps', (req, res) => {
  const stepData = req.body
  const { id } = req.params

  db['schemes'].findById (id)
  .then ((scheme) => {
    if (scheme) {
      db['schemes'].addStep (stepData, id)
      .then ((step) => {
        res.status (201).json (step)
      })
    } else {
      res.status (404).json ({ message: 'Could not find scheme with given id.' })
    }
  })
  .catch ((error) => {
    res.status (500).json ({ message: 'Failed to create new step' })
  })
})

router.put ('/:id', (req, res) => {
  const { id } = req.params
  const changes = req.body

  db['schemes'].findById (id)
  .then ((scheme) => {
    if (scheme) {
      db['schemes'].update (changes, id)
      .then ((updatedScheme) => {
        res.json (updatedScheme)
      })
    } else {
      res.status (404).json ({ message: 'Could not find scheme with given id' })
    }
  })
  .catch ((error) => {
    res.status (500).json ({ message: 'Failed to update scheme' })
  })
})

router.delete ('/:id', (req, res) => {
  const { id } = req.params

  db['schemes'].remove (id)
  .then ((deleted) => {
    if (deleted) {
      res.json ({ removed: deleted })
    } else {
      res.status (404).json ({ message: 'Could not find scheme with given id' })
    }
  })
  .catch ((error) => {
    res.status (500).json ({ message: 'Failed to delete scheme' })
  })
})

module.exports = router
