const express = require('express')
const { findchatid, readchat } = require('../controller/chat_controller.js')
const { authenticateToken } = require('../controller/auth_controller.js')
const { createmessage, deletemessage, editmessage } = require('../controller/crud_message.js')

const message = express()


message.post('/:chatid', authenticateToken, findchatid, createmessage)

message.delete('/:chatid', authenticateToken, findchatid, deletemessage)

message.put('/:chatid', authenticateToken, findchatid, editmessage)

module.exports = message