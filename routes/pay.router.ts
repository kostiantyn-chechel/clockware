import * as express from 'express';
import { Request } from 'express';
import { Response } from 'express';
const router = express.Router();
const payStrip = require('../controllers/payStrip.controller');

// router.get('/stripe/:id', payStrip.getClientSecret);
router.post('/stripe', payStrip.postPayment);

module.exports = router;