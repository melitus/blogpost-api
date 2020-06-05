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

const register = async (inputdata) => {

    const newUser = new UserModel(inputdata)
    const saveUsed = await newUser.save()
     return saveUsed
}


const updateUser = async (userId, inputdata) => {
        let filter = {_id:userId}
        let selector = {$set: inputdata }
        const updatedUser = await UserModel.updateOne(filter, selector)
        return updatedUser
}

const deleteUser = async (userId) => {
    const deletedUsed = await UserModel.deleteOne({_id: userId})

    return deletedUsed
}

module.exports={
    getSingleUser,
    getAllUser,
    register,
    updateUser,
    deleteUser
}