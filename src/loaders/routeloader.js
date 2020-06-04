const express = require('express')

const userRoute = require('../v1/api/users')
const blogpostRoute = require('../v1/api/blogposts')
const commentsRoute = require('../v1/api/comments')

const apiRouter = express.Router()

apiRouter.use('/users', userRoute)
apiRouter.use('/blogposts', blogpostRoute)
apiRouter.use('/comments', commentsRoute)

module.exports = apiRouter