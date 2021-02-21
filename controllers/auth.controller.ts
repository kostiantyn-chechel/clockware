import { Request, Response, NextFunction} from 'express';
const {FB, FacebookApiException} = require('fb');
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

exports.authFacebook = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.body.accessToken;
    // const token = 'EAAMSObAjdocBAEUFHLJUvaAZAIGt2Ln7hfFOqexLenfnyFHMcZCZCYoxCDqhOtdwtDm3sHsQehL3IDwv6BnQ3n0VfyZC2UZBcw5Rj3p2JYMn1yIUWrZBzE6pJSh7HPmtO4Vj5PxPuHViTXTEDud19ehCaemZABOFQEt8qv4Bi3WG8b1WDX0TVmNK3UleeOx6ZCboPZBjEI0aZBKgZDZD';
    console.log('accessToken', token);
    const facebookUser = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
    console.log('facebookUser.data', facebookUser.data);

    await FB.options({version: 'v2.4'});
    await FB.extend({ appId: process.env.FACEBOOK_APP_ID, appSecret: process.env.FACEBOOK_APP_SECRET });

    // await FB.setAccessToken(token);
    // await FB.api('4', { fields: 'id,name,email' }, function (res) {
    //     if(!res || res.error) {
    //         console.log(!res ? 'error occurred' : res.error);
    //         return;
    //     }
    //     console.log('id',res.id);
    //     console.log('name',res.name);
    //     console.log('email',res.email);
    // });


    // const data = facebookUser.data;
    // const login = data.email;
    // const name = data.name;
    // const facebookUser = await axios.get(`https://graph.facebook.com/v8.0/me?access_token=${token}`);
    // const data = facebookUser.data;

    // console.log('facebookUser', facebookUser);
    // console.log('facebookUser.data', data);

    const login = 'mock@email.com';
    const name = 'MOCK Name';


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