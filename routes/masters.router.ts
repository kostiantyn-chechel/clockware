import * as express from 'express';
const master = require('../controllers/master.controller');
const { verifyToken } = require('../processing/auth');
const { userData, userVerification, userAdd, userChangeData } = require('../controllers/user.controller');
const router = express.Router();

router.post('/', verifyToken, userVerification, master.createMaster);
router.get('/', verifyToken, master.findAll);
router.get('/find', master.findAllFreeMasters);
router.get('/list', verifyToken, master.list);
router.get('/filter', verifyToken, master.findAllFilter);
router.get('/:id', verifyToken, master.findOne);
router.put('/:id', verifyToken, master.update);
router.delete('/:id', verifyToken, master.delete);

module.exports = router;
