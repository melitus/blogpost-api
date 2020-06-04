const express = require('express')

const userRoute = require('../v1/api/users')
const blogpostRoute = require('../v1/api/blogposts')

const apiRouter = express.Router()

apiRouter.use('/users', userRoute)
apiRouter.use('/blogposts', blogpostRoute)

module.exports = apiRouter