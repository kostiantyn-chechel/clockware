import { NextFunction, Request, Response } from 'express'
import { IError, IUserChangeReg } from "../Type/interfaces";
const db = require("../models");
const Op = db.Sequelize.Op;
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
            login: req.body.login,
            status: {[Op.ne]: 'notAuth'}
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
    const salt = generateSalt();
    const user = {
            login: req.body.login,
            name: req.body.name,
            status: req.body.status,
            password: generatePassCrypt(req.body.password, salt),
            salt: salt,
        };

    User.findOne({
        where: {
            login: req.body.login,
        }
    })
        .then((existingUser:any) => {
            if (existingUser) {
                User.update(user, {
                    where: {
                        id: existingUser.id
                    }})
                    .then(()=>{
                            User.findOne({
                                where: existingUser.id
                            }).
                            then(updateUser => {
                                res.send({
                                    id: updateUser.id,
                                    status: updateUser.status,
                                    name: updateUser.name,
                                    login: updateUser.login,
                                    token: generateToken(user.login)
                                });
                            })
                        }
                    )
            } else {
                User.create(user)
                    .then((user:any) => {
                        res.send({
                            id: user.id,
                            status: user.status,
                            name: user.name,
                            login: user.login,
                            token: generateToken(user.login)
                        })
                    })
            }
        })
        .catch((err: IError) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });

};

exports.userChangeData = (req: Request, res: Response) => {
    const user: IUserChangeReg = {};
    if(req.body.login) user.login = req.body.login;
    if(req.body.name) user.name = req.body.name;
    if(req.body.password) {
        user.salt = generateSalt();
        user.password = generatePassCrypt(req.body.password, user.salt)
    }

    User.update(user, {
        where: {
            id: req.body.id
        }})
        .then(()=>{
            User.findOne({
                where: req.body.id
            }).
            then(updateUser => {
                res.send({
                    id: updateUser.id,
                    status: updateUser.status,
                    name: updateUser.name,
                    login: updateUser.login,
                    token: generateToken(user.login)
                });
            })

            }
        )
        .catch((err: IError) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while update the User."
            });
        });
};