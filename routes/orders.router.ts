import * as express from 'express';
const router = express.Router();
const order = require('../controllers/order.controller');
const { verifyToken } = require('../processing/auth');

router.post('/', order.create);
router.get('/filter', verifyToken, order.findFilter);
router.get('/:id', verifyToken, order.getOrderById);
router.get('/client/:id', verifyToken, order.clientOrders);
router.put('/pay/', verifyToken, order.updatePayStatus);
router.delete('/:id', verifyToken, order.delete);

module.exports = router;