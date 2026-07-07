const jwt = require('jsonwebtoken');
const { prisma } = require('../lib/prisma.js')
const bcrypt = require('bcrypt');

async function signup(req, res, next) {
    const { username, password } = req.body;

    if (req.user) {
        return res.sendStatus(401);
    }

    if (username === undefined || password === undefined) {
        return res.json("Request body incomplete");
    }

    const dupeuser = await prisma.user_database.findFirst({
        where: { username }
    });

    if (dupeuser) {
        return res.json("Username has been taken");
    }

    const encryptedPass = await bcrypt.hash(password, parseInt(process.env.SALTROUND));

    const result = await prisma.user_database.create({
        data: {
            username: username,
            password: encryptedPass
        }
    });

    next();
}

async function login(req, res) {
    const { username, password } = req.body;

    if (username === undefined || password === undefined) {
        return res.json("Request body incomplete");
    }

    const finduser = await prisma.user_database.findFirst({
        where: { username }
    });

    if (finduser === null) {
        return res.json("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, finduser.password);
    if (!passwordMatch) {
        return res.json("Invalid credentials");
    }

    const token = jwt.sign({ id: finduser.id, username }, process.env.SERCERTKEY, { expiresIn: '7d' });

    res.json(token);
}

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.SERCERTKEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken, signup, login }
