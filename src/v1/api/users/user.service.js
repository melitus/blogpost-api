const UserModel = require('./users.model')
const {generateAuthToken, passwordMatches, generatePasswordHash} = require('../../../middlewares/auth-guard')

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

const login = async (req) => {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return next(new Error('Email does not exist'));
      await passwordMatches(password, user.password);
      const accessToken = await generateAuthToken(user)
      await User.findByIdAndUpdate(user._id, { accessToken })
      let response = {
        data: { email: user.email, role: user.role },
        accessToken
      }
     return response
  }

const register = async (inputdata) => {
    const { role, email, password } = inputdata
    const hashedPassword = await generatePasswordHash(password);
    let newInputData = { email, password: hashedPassword, role: role }
    const newUser = new UserModel(newInputData)
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
    deleteUser,
    login
}