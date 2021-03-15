import * as express from 'express';
const router = express.Router();
const { authUser } = require('../processing/auth');
const calendar = require('../controllers/calendar.controller');


// router.get('/', calendar.getCalendar);
// router.get('/events', calendar.getEvents);
router.get('/test', calendar.test);

module.exports = router;