const CommentsModel = require('./comments.model')
const BlogPostModel = require('../blogposts/blogposts.model')

//get all post
const getAllComments = async(req, res) =>{
    try{
        const searchQuery = {}
        const foundComments = await CommentsModel.find(searchQuery)
        .populate('user', 'firstName lastName')
        res.status(200).json({allComments: foundComments})
    }catch(e){

    }

}

const CommmentAPostByUser = async (req, res) => {
    // create a comment
    // attach user a user doing the comment
    // update the commentfield on blogpost model
    // save the comment

    try {
        let inputData = req.body
        let {postId} = req.params
        console.log({postId})
         const newComment = new CommentsModel(inputData)
         let filter = {_id: postId }
         let update = {$push: {comments: newComment._id}}
        await BlogPostModel.updateOne(filter, update)
        const saveComments = await newComment.save()
        res.status(200).json({data: saveComments})
    } catch (e) {

    }

}
module.exports = {
    getAllComments,
    CommmentAPostByUser
}