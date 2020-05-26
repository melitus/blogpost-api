const express = require('express')
const bodyParser = require('body-parser')

const {connect} = require('./config')

connect()

let server = express()
let router = express.Router()

let port = 4000

server.use(bodyParser.json())

function welcome(req, res){
    res.status(200).json('welcome to Nodejs class, today is day 4')

}

function login(req, res) {
 let username = req.body.username
 console.log({username})
 let email = req.body.email
 console.log({email})
 res.status(200).json({username, email})

}

router.get('/welcome', welcome)
router.post('/login', login)

server.use('/api/v1', router)

server.listen(port, ()  => {
    console.log('Nodejs server running on port ' + port)
})