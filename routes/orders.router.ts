import * as express from 'express';
const router = express.Router();
const order = require('../controllers/order.controller');
const { verifyToken } = require('../processing/auth');

router.post('/', order.create);
router.get('/filter', verifyToken, order.findFilter);
router.get('/client/:id', verifyToken, order.clientOrders);
router.delete('/:id', verifyToken, order.delete);
router.get('/date', order.date);

module.exports = router;