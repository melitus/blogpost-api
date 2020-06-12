const dotenv = require('dotenv');
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();

const config = {
  port: process.env.APP_PORT,
  databaseURL: process.env.DATABASE_URI,
  requiresAuth:false,
  jwtPrivateKey:process.env.JWT_SECRET,
  jwtDuration: process.env.JWT_EXPIRATION,
  saltingRounds: 10

}

module.exports = config
