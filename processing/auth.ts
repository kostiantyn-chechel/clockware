import { Request, Response, NextFunction} from 'express'
import { IError } from "../Type/interfaces";
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const User = db.user;


const authUser = async (req: Request, res: Response, next: NextFunction) => {
    User.findOne({
        where: {
            login: req.body.login
        }
    })
        .then((user: any) => {
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

const generateToken = (login: string) => {
    return jwt.sign({ login: login }, process.env.SECRET_KEY, {
        expiresIn: 720 // 12 min - token lifetime
        // expiresIn: 6060 // 101 min - token lifetime
    });
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err: IError, decoded: any) => {
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

