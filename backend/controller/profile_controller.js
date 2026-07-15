const { prisma } = require("../lib/prisma.js");
const jwt = require("jsonwebtoken");




function extractPublicId(url) {
    try {
        const parts = url.split("/");
        const fileWithExt = parts[parts.length - 1];
        const publicIdWithoutExt = fileWithExt.split(".")[0];
        const folder = parts[parts.length - 2];
        return `${folder}/${publicIdWithoutExt}`;
    } catch {
        return null;
    }
}

async function finduserdetail(user) {
    const user_detail = await prisma.user_database.findFirst({
        where: {
            username: user.username,
        },
    });

    return user_detail;
}

async function ChangeProfilePicture(req, res) {
    const filedetail = req.file;
    const user = req.user;
    if (!filedetail) {
        return res.json("File didn't got uploaded");
    }

    try {
        const user_detail = await finduserdetail(user);

        if (user === null) {
            res.json("User doesn't exist");
        }

        if (user_detail.avatarUrl) {
            const oldPublicId = extractPublicId(user_detail.avatarUrl);
            if (oldPublicId) {
                await cloudinary.uploader.destroy(oldPublicId).catch((err) => {
                    console.error("Failed to delete old avatar:", err);
                    // don't block the update just because cleanup failed
                });
            }
        }

        const result = await prisma.user_database.update({
            where: {
                username: user_detail.username,
            },

            data: {
                avatarUrl: req.file.path,
            },
        });

        return res.status(200).json("Change profile picture successfully");
    } catch (error) {
        return res.sendStatus(500);
    }
}

async function ChangeUsername(req, res) {
    const { newusername } = req.body;
    const user = req.user;

    if (!user) {
        res.status(401).json("Forbidden");
    }

    if (!newusername) {
        res.status(400).json("NewUsername didn't exist");
    }

    try {
        const user_detail = await finduserdetail(user);

        if (!user_detail) {
            res.status(401).json("Forbidden");
        }

        const dupeusername = await prisma.user_database.findFirst({
            where: {
                username: newusername,
            },
        });

        if (dupeusername !== null) {
            res.status(500).json("This username already taken");
        }

        const result = await prisma.user_database.update({
            where: {
                userid: user_detail.userid,
            },

            data: {
                username: newusername,
            },
        });

        const token = jwt.sign(
            { id: user_detail.userid, username: newusername },
            process.env.SERCERTKEY,
            { expiresIn: "7d" },
        );

        res.status(200).json(token);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}

async function ChangeBio(req, res) {
    const { newbio } = req.body;

    const user = req.user;

    if (!user) {
        return res.status(401).json("Forbidden");
    }

    if (!newbio) {
        return res.status(400).json("Newbio didn't exist");
    }

    try {
        const user_detail = await finduserdetail(user);

        if (!user_detail) {
            return res.status(401).json("Forbidden");
        }

        const result = await prisma.user_database.update({
            where: {
                userid: user_detail.userid
            },

            data: {
                bio: newbio
            }
        })

        return res.status(200).json("Update Bio succesfully")
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}

module.exports = { ChangeUsername, ChangeProfilePicture, ChangeBio };
