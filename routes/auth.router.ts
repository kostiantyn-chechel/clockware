import * as express from 'express';
const { authUser } = require('../processing/auth');
const { userData, userVerification, userAdd, userChangeData } = require('../controllers/user.controller');
const { authGoogle, authFacebook } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/', authUser, userData);
router.post('/google', authGoogle, userData);
router.post('/facebook', authFacebook, userData);
router.post('/reg', userVerification, userAdd);
router.post('/change', userVerification, userChangeData);

module.exports = router;