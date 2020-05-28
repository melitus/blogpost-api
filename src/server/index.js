const express = require('express')
const bodyParser = require('body-parser')

const {connect} = require('../config/mongoose')
const router = require('../v1/api/users')

connect()

let server = express()

let port = 4000

server.use(bodyParser.json())

server.use('/api/v1', router)

server.listen(port, ()  => {
    console.log('Nodejs server running on port ' + port)
})