import * as express from 'express';
const router = express.Router();
const { authUser } = require('../processing/auth');
const calendar = require('../controllers/calendar.controller');


router.get('/', calendar.getCalendar);

module.exports = router;