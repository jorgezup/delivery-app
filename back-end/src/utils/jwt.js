require('dotenv').config();

const jwt = require('jsonwebtoken');

const readFile = require('./readFs');

const SECRET = readFile();

console.log(SECRET);

const jwtConfig = {
  // expiresIn: '1h',
  algorithm: 'HS256',
};

const generateJWTToken = (payload) => jwt.sign(payload, SECRET, jwtConfig);

const decodeToken = (token) => jwt.verify(token, SECRET, jwtConfig);

module.exports = {
  generateJWTToken,
  decodeToken,
};
