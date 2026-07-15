const express = require('express')
const { authenticateToken, login, signup, DecyrptToken } = require('../controller/auth_controller.js')

const auth = express()

auth.use(express.json())

auth.post('/login', signup)

auth.post('/signup', signup, login)

auth.get('/decyptToken', DecyrptToken)

module.exports = auth