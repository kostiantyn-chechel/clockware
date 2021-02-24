import { Request, Response, NextFunction} from 'express';
import axios from 'axios';
const { FB } = require('fb');
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

exports.authFacebook = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.body.accessToken;
    console.log('token', token);

    FB.options({version: 'v2.4'});
    FB.extend({ appId: process.env.FACEBOOK_APP_ID, appSecret: process.env.FACEBOOK_APP_SECRET });

    FB.setAccessToken(token);

    FB.api('me', { fields: 'id,name,email' }, async function (fbRes) {
        if(!fbRes || fbRes.error) {
            console.log(!res ? 'error occurred' : fbRes.error);
            return;
        }
        req.body.login = fbRes.email;
        await userCheckOrAdd(fbRes.name, fbRes.email);

        next();
    });
};

const userCheckOrAdd = async (name: string, login: string) => {
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
            })
        }
    }
};