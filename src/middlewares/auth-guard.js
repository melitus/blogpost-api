const jwt = require("jsonwebtoken");
const  bcrypt = require('bcrypt');

const config = require('../config/config')

// less cpu usage
const generatePasswordHash = async (password) =>{
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  return hashedPassword
}

const passwordMatches = async (plainPassword, hashedPassword) => {
  let isPasswordEqual = await bcrypt.compare(plainPassword, hashedPassword)
  if (!isPasswordEqual)
   throw new Error('Incorrect password')

return isPasswordEqual
}

const generateAuthToken = async function(user) {
    // Generate an auth token for the user
    const jwtPayload = { id: user._id};
    const jwtData = {expiresIn: config.jwtDuration};
    const secret = config.jwtSecret;

    const token = jwt.sign(jwtPayload, secret, jwtData)
    user.tokens = user.tokens.concat({token})
    return token
}


const getTokenFromHeader = req => {
    if (
      (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
      (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
    ) {
      return req.headers.authorization.split(' ')[1];
    }
    return null;
  };


  Steps:
  // 1: Read the token from header
  // 2: Verify the token with JWT
  // 3: Once verified, attach user object into the request
  // 4: Then continue with next()

const allowIfLoggedin = (req, res, next) => {
  if (!config.requiresAuth) return next();

  const token = getTokenFromHeader(req);
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.jwtPrivateKey);
    // Let's pass back the decoded token to the request object
    req.user = decoded;
     // We call next to pass execution to the subsequent middleware
    next();
  } catch (error) {
    res.status(400).send({ error: 'JWT token has expired, please login to obtain a new one' });
  }
};

const checkRole = (requiredRole) => {
    return (req, res, next) => {
      if(req.user.role === requiredRole) {
        return next();
      } else {
        return res.status(401).send('Action not allowed to access this resource');
      }
    }
  }


  module.exports = {
    generatePasswordHash,
    passwordMatches,
    generateAuthToken,
    allowIfLoggedin,
    checkRole
  }