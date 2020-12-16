import {NextFunction, Request, Response} from 'express'
import {IError} from "../Type/interfaces";
const db = require("../models");
const User = db.users;
const { generateToken, generateSalt, generatePassCrypt } = require('../processing/auth');

exports.userData = (req: Request, res: Response) => {
    User.findOne({
        where: {
            login: req.body.login
        }
    })
        .then((user:any) => {
            res.send({
                id: user.id,
                status: user.status,
                name: user.name,
                login: user.login,
                token: generateToken(user.login)
            })
    })
};

exports.userVerification = (req: Request, res: Response, next: NextFunction) => {
    User.findOne({
        where: {
            login: req.body.login
        }
    })
        .then((user:any) => {
            if (user) {
                res.send({ message: `Пользователь с логином ${req.body.login} уже зарегистрирован в системе` })
            } else {
                next();
            }
        })
};

exports.userAdd = (req: Request, res: Response) => {

    const user = () => {
        const salt = generateSalt();
        return {
            login: req.body.login,
            name: req.body.name,
            status: req.body.status,
            password: generatePassCrypt(req.body.password, salt),
            salt: salt,
        }

    };

    User.create(user())
        .then((user:any) => {
            res.send({
                id: user.id,
                status: user.status,
                name: user.name,
                login: user.login,
                token: generateToken(user.login)
            })
        })
        .catch((err: IError) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};