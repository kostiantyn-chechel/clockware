import { Request, Response, NextFunction} from 'express'
import { IError } from "../Type/interfaces";
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const User = db.users;

const EXPIRES_IN = 60 * 32; // 32 min - token lifetime (time in seconds)


const authUser = async (req: Request, res: Response, next: NextFunction) => {
    // console.log('req.body', req.body.login);
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
    return jwt.sign({ login: login }, process.env.SECRET_KEY, { expiresIn: EXPIRES_IN });
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
        req.body.aythLogin = decoded.login;
        next();
    });
};

const generateSalt = (): string => bcrypt.genSaltSync(10);

const generatePassCrypt = (pass:string, salt: string): string => bcrypt.hashSync(pass, salt);


module.exports = {
    authUser,
    generateToken,
    verifyToken,
    generateSalt,
    generatePassCrypt
};

