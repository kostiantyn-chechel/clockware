import { Request, Response, NextFunction} from 'express';
import axios from 'axios';
const db = require('../models');
const User = db.users;

exports.authGoogle = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.body.idToken;

    const googleUser = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
    const data = googleUser.data;
    const login = data.email;
    const name = data.name;

    const user = await User.findOne({
        where:{
            login: login,
        }
    });

    if (!user) {
        await User.create({
            login: login,
            name: name,
            status: 'client',
        });
    } else {
        if (user.status === 'notAuth'){
            const updateUser = {
                name: name,
                status: 'client',
            };
            await User.update(updateUser, {
                where: {
                    login: login,
                }
            })}
        }

    req.body.login = login;
    next();
};