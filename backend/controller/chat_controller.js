const { prisma } = require('../lib/prisma.js')

async function createchat(req, res) {
    const { targetid } = req.body

    const personexist = await prisma.user_database.findFirst({
        where: {
            userid: targetid
        }
    })

    if (personexist === null) {
        res.json("User doesn't exist")
    }

    const user = await prisma.user_database.findFirst({
        where: {
            username: req.user.username
        }
    })

    const dupechat = await prisma.chats.findFirst({
        where: {
            memberid: {
                equals: [targetid, user.userid]
            }
        }
    })

    if (dupechat !== null) {
        res.json("Chat has been created")
    }

    const result = await prisma.chats.create({
        data: {
            memberid: [targetid, user.userid]
        }
    })
    return res.json(result)
}

async function findchatid(req, res, next) {
    const targetid = parseInt(req.params.chatid)

    if (targetid === undefined) {
        res.json("Target id undefined")
    }

    try {
        const user = await prisma.user_database.findFirst({
            where: {
                username: req.user.username
            }
        })

        const chat = await prisma.chats.findFirst({
            where: {
                chatid: targetid
            }
        })

        req.chatid = chat.chatid
        next()
    } catch (error) {
        res.json(error)
    }

}

async function readchat(req, res) {
    const chatid = req.chatid

    if (chatid === undefined) {
        res.json("chatid invalid")
    }

    const chathistory = await prisma.chats.findFirst({
        where: {
            chatid: chatid
        },
        include: {
            messages: true
        }
    })

    res.json(chathistory)
}

module.exports = { createchat, findchatid, readchat }