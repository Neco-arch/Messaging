const express = require('express')
const { findchatid, readchat } = require('../controller/chat_controller.js')
const { authenticateToken } = require('../controller/auth_controller.js')
const { createmessage } = require('../controller/crud_message.js')

const message = express()

message.get('/:chatid', authenticateToken, findchatid, readchat)

message.post('/:chatid', authenticateToken, findchatid, createmessage)

module.exports = message