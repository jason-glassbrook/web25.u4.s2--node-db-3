/***********************************************************
  server
***********************************************************/

/// tools ///

const express = require ('express')
const helmet = require ('helmet')
const morgan = require ('morgan')

/***************************************
  setup server
***************************************/

const server = express ()

/// wares ///

server.use ([
  helmet (),
  morgan ('dev'),
])

/// routers ///

server.use ('/api', require ('./routers/api').router)

/// requests ///

server.route ('*')
.all ((ri, ro) => {
  ro
  .status (501)
  .json ({
    error : {
      message : `not implemented : ${ri.method} ${ri.originalUrl}`,
    }
  })
})

/**************************************/

module.exports = server
