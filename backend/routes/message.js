const express = require('express')
const { findchatid } = require('../controller/chat_controller.js')
const { authenticateToken } = require('../controller/auth_controller.js')

const message = express()