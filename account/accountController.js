const express = require("express");
const router = express.Router();
const { hash, compare } = require("bcrypt");
const { sign, decode, verify } = require("jsonwebtoken");
const accountRepository = require("./accountRepository");

router.post('/register', async (req, res) => {
    const { fullName, username, password } = req.body;
    try {
        const hashedPass = await hash(password, 15);
        await accountRepository.add(fullName, username, hashedPass);
        res.status(201).json({
            message: "You have been registered sucessfully!"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await accountRepository.get(username);
        if (!user) {
            res.status(404).json({
                message: "No user found with that username."
            });
        }
        const pass = await compare(password, user.password)
        if (!pass) {
            res.status(401).json({
                message: "Invalid password. Please try again."
            });
        }
        const token = await sign(JSON.stringify(user), 'NotSoSecret', { algorithm: 'HS384' });
        res.status(200).json({
            message: "Logged in successfully!",
            token
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.put('/update/:id', async (req, res) => {
    const { token } = req.headers;
    const { id } = req.params;
    const user = req.body.user;
    try {
        await verify(token, 'NotSoSecret', { algorithms: 'HS384' });
        await accountRepository.update(id, user);
        res.status(200).redirect.json({
            message: "Your profile has been updated."
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.delete('/deactivate', async (req, res) => {
    const { token } = req.headers;
    try {
        const user = await decode(token);
        await accountRepository.remove(user);
        res.status(200).json({
            message: "Your account has been deactivated with success."
        }) ;
    } catch (error) {
        res.status(500).res.json({
            message: error.message
        });
    }
});

module.exports = router;