import * as express from 'express';
const { authUser } = require('../processing/auth');
const user = require('../controllers/user.controller');
const auth = require('../controllers/auth.controller');

const router = express.Router();

router.post('/', authUser, user.userData);
router.post('/google', auth.authGoogle, user.userData);
router.post('/facebook', auth.authFacebook, user.userData);
router.post('/reg', user.userVerification, user.userAdd);
router.post('/change', user.userVerification, user.userChangeData);

module.exports = router;