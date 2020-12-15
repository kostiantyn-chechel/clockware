import * as express from 'express';
// import { Request, Response} from 'express'
// const { authUser, generateToken } = require('../processing/auth');
const { authUser } = require('../processing/auth');
const { userData } =require('../controllers/user.controller');
const router = express.Router();

router.post('/', authUser, userData);
// router.post('/', authUser, userData, (req:Request, res:Response) => {
    // res.send({
    //     login: req.body.login,
    //     token: generateToken(req.body.login),
    // });
// });

module.exports = router;