const jwt = require('jsonwebtoken')

function generateToken(payload) {
  const token = jwt.sign(payload, 'secret')
  return token
}

function verifyToken(token) {
  return jwt.verify(token, 'secret')
}

module.exports = { generateToken, verifyToken }