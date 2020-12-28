import * as express from 'express';
const { authUser } = require('../processing/auth');
const { userData, userVerification, userAdd, userChangeData } = require('../controllers/user.controller');
const router = express.Router();

router.post('/', authUser, userData);
router.post('/reg', userVerification, userAdd);
router.post('/change', userVerification, userChangeData);

module.exports = router;