require('dotenv').config()
const express = require('express')
const auth = require('./routes/auth.js')
const chat = require('./routes/chat.js')
const message = require('./routes/message.js')


const app = express()

// Bulit in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use('/auth', auth)
app.use('/chat', chat)
app.use('/chat', message)


app.listen(process.env.PORT, () => {
    console.log("Server is running on " + process.env.PORT)
})