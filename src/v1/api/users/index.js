const express = require('express')

const UserController = require('./users.controller')

const router = express.Router()

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.get('/getUsers', UserController.getAllUser)

router.get('/getuser/:userId', UserController.getSingleUser)
router.put('/updateuser/:userId', UserController.updateUser)
router.delete('/deleteuser/:userId', UserController.deleteUser)

module.exports = router