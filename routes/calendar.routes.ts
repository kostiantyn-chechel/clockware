import * as express from 'express';
const { verifyToken } = require('../processing/auth');
const calendar = require('../controllers/calendar.controler');

const router = express.Router();

router.get('/master/:id', calendar.masterOrders);

module.exports = router;