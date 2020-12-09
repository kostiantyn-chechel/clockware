import * as express from 'express';
import { Request, Response} from 'express'
const { authUser, generateToken } = require('../processing/auth');
const router = express.Router();

router.post('/', authUser, (req:Request, res:Response) => {
    res.send({
        login: req.body.login,
        token: generateToken(req.body.login),
    });
});

module.exports = router;