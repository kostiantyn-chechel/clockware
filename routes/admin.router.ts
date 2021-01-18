import * as express from 'express';
const { authUser } = require('../processing/auth');
const { listAllCityWithMasters } = require('../controllers/admin.controller');
const router = express.Router();

// router.get('/', authUser, listCity);
router.get('/', listAllCityWithMasters);
router.get('/filters', listAllCityWithMasters);

module.exports = router;