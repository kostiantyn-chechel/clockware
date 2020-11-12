const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const User = db.user;


const authUser = async (req, res, next) => {
    User.findOne({
        where: {
            login: req.body.login
        }
    })
        .then(user => {
            if(!user) {
                res.send({ message: 'Неверный логин!' })
            } else {
                if (user.password === bcrypt.hashSync(req.body.password, user.salt)) {
                    next();
                } else {
                    res.send({ message: 'Неверный пароль!' })
                }
            }
        })
};

const generateToken = (login) => {
    return jwt.sign({ login: login }, process.env.SECRET_KEY, {
        expiresIn: 720 // 12 min - token lifetime
        // expiresIn: 6060 // 101 min - token lifetime
    });
};

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.send({
                message: "Unauthorized!"
            });
        }
        req.body.login = decoded.login;
        next();
    });
};

module.exports = {
    authUser,
    generateToken,
    verifyToken,
};

