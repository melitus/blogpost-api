const UserService = require('./user.service')

const register = async (req, res) => {
    try {
        const inputdata = req.body
        console.log(inputdata)
         const savedUser = await UserService.register(inputdata)
        res.status(201).res.json({
            data: savedUser,
            message: "You have signed up successfully"
          })
    } catch (e) {
    next(error)
    console.trace(e)
    }
}

const login = async (req, res, next) => {
    try {
      const response = await UserService.login(req)
      res.status(200).json({
        data: { email: user.email, role: user.role },
        accessToken
      })
    } catch (error) {
      next(error);
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
        const foundUser = await UserService.getSingleUser(userId)
        res.status(200).json({singleUser : foundUser})
    } catch (e) {

    }
}

const updateUser = async (req, res) => {
    try {
        const {userId} = req.params
        const inputdata = req.body
        const updated = await UserService.updateUser(userId, inputdata)
        res.status(200).json({data: updated})
    } catch (e) {

    }

}

const deleteUser = async (req, res) => {
    try {
    let {userId} = req.params
    const deletedUsed = await UserService.deleteUser(userId)
    res.status(200).json({message: 'User deleted successfully', data:deletedUsed})
    } catch (e) {
     console.trace(e)
    }
}

module.exports = {
    register,
    login,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser
}