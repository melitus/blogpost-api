const BlogpostModel = require('./blogposts.model')

const postBlog = async(req, res) => {

    try{
        const inputdata = req.body
        console.log({inputdata})

        const newPost = new BlogpostModel(inputdata)
        const savePost = await newPost.save()
        res.status(200).json({savePost})
    }catch(e){
        console.trace(e)
    }
}
//get all post
const getAllPost = async(req, res) =>{
    try{
        const searchQuery = {}
        const foundPosts = await BlogpostModel.find(searchQuery)
        .populate('comments', 'content user')
        res.status(200).json({allPosts: foundPosts})
    }catch(e){

    }

}

const postByUser = async (req, res) => {
    try {
        let inputData = req.body
        let {userId} = req.params
         let filter = {_id: blogpostId }
         let selector = {$push: {comments: inputData}}
        const commentByUser = await BlogpostModel.updateOne({filter, selector})
        res.status(200).json({data: commentByUser})
    } catch (e) {

    }

}
module.exports = {
    postBlog,
    getAllPost,
    postByUser
}