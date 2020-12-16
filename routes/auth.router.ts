import * as express from 'express';
import { Request, Response} from 'express'
const { authUser, generateSalt } = require('../processing/auth');
const { userData, userVerification, userAdd } =require('../controllers/user.controller');
const router = express.Router();

router.post('/', authUser, userData);
router.post('/reg', userVerification, userAdd);

module.exports = router;