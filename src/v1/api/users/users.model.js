const mongoose = require('mongoose')

let Schema = mongoose.Schema

let roles = ['guest', 'admin', 'moderator']

const userSchema = new Schema ({
    email: {type: String},
    password: {type: String},
    roles:{type:String, enum: roles, default: 'guest' },
    firstName: {type: String},
    lastName: {type: String},
    blogpost: [{type: Schema.ObjectId, ref: 'BlogPosts'}]
})

module.exports = mongoose.model("Users", userSchema)