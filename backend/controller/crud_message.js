const { prisma } = require("../lib/prisma.js");

async function createmessage(req, res) {
    const { content } = req.body;
    const chatid = req.chatid;

    if (chatid !== undefined && content !== undefined) {
        try {
            const user = await prisma.user_database.findFirst({
                where: {
                    username: req.user.username,
                },
            });

            const chatmember = await prisma.chats.findFirst({
                where: {
                    chatid: chatid,
                },
            });

            if (!chatmember.memberid.includes(user.userid)) {
                res.json("Invalid Person");
            }

            const result = await prisma.message.create({
                data: {
                    content: content,
                    sender: {
                        connect: { userid: user.userid },
                    },
                    chat: {
                        connect: { chatid: chatid },
                    },
                },
            });
            return res.json({ message: "Message sent successfully", data: result });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: error.message });
        }
    }
    res.json("Send message unsuccessfully ");
}

async function editmessage(req, res) {
    const { new_content, messageid } = req.body;
    const chatid = req.chatid;

    if (
        (new_content !== undefined && messageid !== undefined) ||
        chatid !== undefined
    ) {
        const messageid_valid = await prisma.message.findFirst({
            where: {
                messageid: messageid,
            },
        });

        const user = await prisma.user_database.findFirst({
            where: {
                username: req.user.username,
            },
        });

        const chatmember = await prisma.chats.findFirst({
            where: {
                chatid: chatid,
            },
        });

        if (!chatmember.memberid.includes(user.userid)) {
            res.json("Invalid Person");
        }

        if (messageid_valid !== null) {
            const result = await prisma.message.update({
                where: {
                    messageid: messageid,
                },

                data: {
                    content: new_content,
                },
            });

            res.json("Edit message successfully");
        }

        if (messageid_valid === null) {
            res.json("Edit message unsuccessfully");
        }
    }
}

async function deletemessage(req, res) {
    const { messageid } = req.body;
    const chatid = req.chatid;

    const findchatroom = prisma.chats.findFirst({
        where: {
            chatid: chatid,
        },
    });

    const user = await prisma.user_database.findFirst({
        where: {
            username: req.user.username,
        },
    });

    const chatmember = await prisma.chats.findFirst({
        where: {
            chatid: chatid,
        },
    });


    if (!chatmember.memberid.includes(user.userid)) {
        res.json("Invalid Person");
    }

    if (findchatroom !== null) {
        const result = await prisma.message.delete({
            where: {
                messageid: parseInt(messageid),
            },
        });
        return res.json("Delete message successfully")
    }

    if (findchatroom === null) {
        return res.json("Can't delete message");
    }
}

module.exports = { createmessage, deletemessage, editmessage };
