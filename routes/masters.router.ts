import * as express from 'express';
const master = require('../controllers/master.controller');
const order = require('../controllers/order.controller');
const { verifyToken } = require('../processing/auth');
const { userVerification } = require('../controllers/user.controller');
const router = express.Router();

router.post('/', verifyToken, userVerification, master.createMaster);
router.get('/', verifyToken, master.findAllMaster);
router.get('/find', master.findAllFreeMasters);
router.get('/list', verifyToken, master.listMasters);
router.get('/filter', verifyToken, master.findAllMasterFilter);
router.get('/orders/:id', verifyToken, master.masterOrders);
router.put('/order/:id',verifyToken, order.changeStatus, master.masterOrders);
router.get('/:id',  master.findOneMaster);
router.put('/:id', verifyToken, master.updateMaster);
router.delete('/:id', verifyToken, master.deleteMaster);

module.exports = router;
