const express = require('express')

const CommentsController = require('./comments.controller')

const router = express.Router()

router.get('/getAllComments', CommentsController.getAllComments)

router.post('/:postId/comment-post-by-user', CommentsController.CommmentAPostByUser)

module.exports = router