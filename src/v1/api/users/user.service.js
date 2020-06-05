const UserModel = require('./users.model')

const getSingleUser = async (userId) => {
    const foundUser = await UserModel.findOne({_id: userId})
    return foundUser
}

const getAllUser = async () => {
    let searchQuery = {}
    const foundUsers = await UserModel.find(searchQuery)
    .select('-password')
    .populate({
        path: 'blogpost', select: '_id title content',
        populate: { path: 'comments', select: '_id content' }
      })
      .exec()

      return foundUsers
}

module.exports={
    getSingleUser,
    getAllUser
}