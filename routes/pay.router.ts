import * as express from 'express';
const router = express.Router();
const payStrip = require('../controllers/payStrip.controller');

router.get('/stripe/:id', payStrip.getClientSecret);

module.exports = router;