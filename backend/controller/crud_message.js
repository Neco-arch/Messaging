const { prisma } = require('../lib/prisma.js')

async function createmessage(req, res) {
    const { content } = req.body
    const chatid = req.chatid

    if (chatid !== undefined && content !== undefined) {

        try {
            const result = await prisma.message.create({
                data: {
                    chatid: chatid,
                    content: content,
                    sender: req.user.id,
                }
            })
            res.json("Send message succesfully", result)
        } catch (error) {
            res.json(error)
        }
    }
    res.json("Send message unsuccessfully ")
}

async function editmessage(req, res) {
    const { new_content, messageid } = req.body
    const chatid = req.chatid

    if (new_content !== undefined && messageid !== undefined || chatid !== undefined) {
        const messageid_valid = await prisma.message.findFirst({
            where: {
                messageid: messageid
            }
        })

        if (messageid_valid !== null) {
            const result = await prisma.message.update({
                where: {
                    messageid: messageid
                },

                data: {
                    content: new_content
                }
            })

            res.json("Edit message successfully")
        }

        if (messageid_valid === null) {
            res.json("Edit message unsuccessfully")
        }
    }
}

async function deletemessage(req, res) {
    const { messageid } = req.body
    const chatid = req.chatid

    const findchatroom = prisma.chats.findFirst({
        where: {
            chatid: chatid
        }
    })

    if (findchatroom !== null) {
        const result = prisma.message.delete({
            where: {
                messageid: messageid,
                chatid: chatid
            }
        })
    }

    if (findchatroom === null) {
        res.json("Can delete message")
    }
}

module.exports = { createmessage, deletemessage, editmessage }