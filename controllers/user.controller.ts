import { Request, Response } from 'express'
import {IUser, TUserStatus} from "../Type/interfaces";
const db = require("../models");
const User = db.users;
const { generateToken } = require('../processing/auth');

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