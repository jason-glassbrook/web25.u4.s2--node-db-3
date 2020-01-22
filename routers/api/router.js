/***********************************************************
  ~/api - router
***********************************************************/

/// tools ///

const express = require ('express')

/***************************************
  setup router
***************************************/

const router = express.Router ()

/// wares ///

router.use ([
  express.json (),
])

/// sub-routers ///

router.use ('/schemes', require ('./schemes').router)

/**************************************/

module.exports = router
