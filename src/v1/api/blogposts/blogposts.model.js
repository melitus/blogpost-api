const mongoose = require('mongoose')

let Schema = mongoose.Schema

const blogpostsSchema = new Schema ({
    title: {type: String},
    content: {type: String},
    comments: [{type: Schema.ObjectId, ref: 'Comments'}]
})

module.exports = mongoose.model("BlogPosts", blogpostsSchema)