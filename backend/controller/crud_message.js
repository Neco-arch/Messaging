const { prisma } = require('../lib/prisma.js')

async function readmessage(req, res) {
    const chatid = req.chatid

    if (chatid) {
        const result = await prisma.message.findFirst({
            where: {
                chatid: parseInt(chatid)
            },

            include: {
                chat: true
            }
        })

        res.json(result.chat)
    }

    res.json("Chat id not found")
}

async function createmessage(req, res) {
    const chatid = req.chatid

}