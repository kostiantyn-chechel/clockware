import * as express from 'express';
const master = require('../controllers/master.controller');
const { verifyToken } = require('../processing/auth');
const router = express.Router();

router.post('/', verifyToken, master.create);
router.get('/', verifyToken, master.findAll);
router.get('/find', master.findAllFreeMasters);
// router.get('/list', verifyToken, master.list);
router.get('/list', master.list);
router.get('/:id', verifyToken, master.findOne);
router.put('/:id', verifyToken, master.update);
router.delete('/:id', verifyToken, master.delete);

module.exports = router;
