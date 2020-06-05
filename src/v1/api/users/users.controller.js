const UserModel = require('./users.model')
const UserService = require('./user.service')

const register = async (req, res) => {
    try {
        const inputdata = req.body
        console.log(inputdata)

        const newUser = new UserModel(inputdata)
        console.log({newUser})
        const saveUsed = await newUser.save()
        res.status(201).json({saveUsed})
    } catch (e) {
    console.trace(e)
    }
}

const getAllUser = async (req, res) => {
    try {
        const foundUsers = await UserService.getAllUser()
        res.status(200).json({allUsers: foundUsers})

    } catch (e) {

    }
}

const getSingleUser = async (req, res) => {
    try {
        const {userId} = req.params
        console.log({userId})
        const foundUser = await UserService.getAllUser(userId)
        res.status(200).json({singleUser : foundUser})
    } catch (e) {

    }
}

const updateUser = async (req, res) => {
    try {
        const {userId} = req.params
        const inputdata = req.body
        console.log({ userId, inputdata})
        let filter = {_id:userId}
        let selector = {$set: inputdata }
        const updated = await UserModel.updateOne(filter, selector)
        res.status(200).json({data: updated})
    } catch (e) {

    }

}

const deleteUser = async (req, res) => {
    try {
    let {userId} = req.params
    const deletedUsed = await UserModel.deleteOne({_id: userId})
    res.status(200).json({message: 'User deleted successfully', data:deletedUsed})
    } catch (e) {
     console.trace(e)
    }
}

module.exports = {
    register,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser
}