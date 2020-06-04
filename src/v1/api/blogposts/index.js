const express = require('express')

const BlogPostsController = require('./blogposts.controller')

const router = express.Router()

router.post('/postBlog', BlogPostsController.postBlog)
router.get('/getAllPost', BlogPostsController.getAllPost)

router.post('/:userId/post-by-user', BlogPostsController.postByUser)

module.exports = router