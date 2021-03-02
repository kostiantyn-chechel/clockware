import * as express from 'express';
const router = express.Router();
const payStrip = require('../controllers/payStrip.controller');

router.get('/stripe', payStrip.testStrip);

module.exports = router;