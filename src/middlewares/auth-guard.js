const jwt = require("jsonwebtoken");
const config = require('../config/config')

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

  function readToken(req, res, next) {
    if (req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization')
        && req.headers.authorization.split(' ')[0] === 'Bearer' ||
        req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') {
        req.jwt = req.headers.authorization.split(' ')[1];
        next();
    } else {
        return next();
    }
}


  Steps:
  // 1: Read the token from header
  // 2: Verify the token with JWT
  // 3: Once verified, attach user object into the request
  // 4: Then continue with next()

  checkAuth or
const authenticateJWT = (req, res, next) => {
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

app.use(authenticateJWT)

isAuthenticated
  exports.allowIfLoggedin = async (req, res, next) => {
    try {
      const user = res.user
      if (!user)
        return res.status(401).json({
          error: "Permission denied, you must be authenticated"
        });
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  }

  const checkRole = (requiredRole) => {
    return (req, res, next) => {
      if(req.user.role === requiredRole) {
        return next();
      } else {
        return res.status(401).send('Action not allowed to access this resource');
      }
    }
  }


function checkPermissions(...allowed) {
  const isAllowed = permission => allowed.indexOf(permission) > -1
  return (req, res, next) => {
    const { permissions } = req.user.roles
    if (permissions.includes(allowed) && isAllowed(permissions))
    next()
    else{
      res.status(httpStatus.FORBIDDEN).json({message: 'Forbidden'})
    }
  }

}

function checkPermit(...allowed) {
  const isAllowed = permission => allowed.indexOf(permission) > -1;
  // return a middleware
  return (request, response, next) => {
    const { permissions } = request.user.role
    if (request.user && isAllowed(permissions))
      next(); // permission is allowed, so continue on the next middleware
    else {
      response.status(403).json({message: "Forbidden"}); // user is forbidden
    }
  }
}