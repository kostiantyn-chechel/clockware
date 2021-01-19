import * as express from 'express';
const { authUser } = require('../processing/auth');
const { listAllCityWithMasters, filterAdminData } = require('../controllers/admin.controller');
const router = express.Router();

// router.get('/', authUser, listAllCityWithMasters);
router.get('/', listAllCityWithMasters);
// router.get('/filter', authUser, filterAdminData);
router.get('/filter', filterAdminData);

module.exports = router;