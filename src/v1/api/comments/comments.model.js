const mongoose = require('mongoose')

let Schema = mongoose.Schema

const commentSchema = new Schema ({
    content: {type: String},
    user: {type: Schema.ObjectId, ref: 'Users'}
})

module.exports = mongoose.model("Comments", commentSchema)