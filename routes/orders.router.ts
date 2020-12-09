import * as express from 'express';
const router = express.Router();
const order = require('../controllers/order.controller');
const { verifyToken } = require('../processing/auth');

router.post('/', order.create);
router.get('/', verifyToken, order.findAll);
router.get('/filter', verifyToken, order.findFilter);
router.get('/:id', verifyToken, order.findOne);
router.put('/:id', verifyToken, order.update);
router.delete('/:id', verifyToken, order.delete);

module.exports = router;