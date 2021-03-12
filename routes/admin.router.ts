import * as express from 'express';
const { authUser } = require('../processing/auth');
const admin = require('../controllers/admin.controller');
const router = express.Router();

router.get('/', authUser, admin.listAllCityWithMasters);
router.get('/filter', admin.filterAdminData);

module.exports = router;