const express = require('express')
const { createchat, readchat, findchatid } = require('../controller/chat_controller.js')
const { authenticateToken } = require('../controller/auth_controller.js')

const chat = express()

chat.post('/create', authenticateToken, createchat)



module.exports = chat