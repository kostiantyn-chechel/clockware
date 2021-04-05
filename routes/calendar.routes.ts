import * as express from 'express';
const { verifyToken } = require('../processing/auth');
const calendar = require('../controllers/calendar.controler');

const router = express.Router();

router.get('/master/:id', calendar.masterOrders);
router.get('/masters/:cityId', calendar.masterList);

module.exports = router;