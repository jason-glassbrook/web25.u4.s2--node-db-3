const express = require ('express')

const SchemeRouter = require ('./schemes/router.js')

const server = express ()

server.use (express.json ())
server.use ('/api/schemes', SchemeRouter)

module.exports = server
