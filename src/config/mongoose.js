const mongoose = require('mongoose')


// make bluebird default Promise
mongoose.Promise = require('bluebird')

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true 
}

let MONGO_URI = 'mongodb+srv://root:Ogochukwu@123@blogapi-a6kry.mongodb.net/test?retryWrites=true&w=majority'

exports.connect = async () => {
  try {
    console.log('Mongo db connected')
    await mongoose.connect(MONGO_URI, options)
  
    return mongoose.connection
  } catch (e) {
  console.trace(e)
  }

}

