const express = require('express')
const { authenticateToken, login, signup, DecyrptToken } = require('../controller/auth_controller.js')

const auth = express()

auth.use(express.json())

auth.post('/login', login)

auth.post('/signup', signup, login)

module.exports = auth