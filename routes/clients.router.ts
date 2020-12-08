import * as express from 'express';
const client = require('../controllers/client.controller');
const { verifyToken } = require('../processing/auth');
const router = express.Router();

router.post('/', client.create);
router.get('/', verifyToken, client.findAll);
router.get('/:id', verifyToken, client.findOne);
router.put('/:id', verifyToken, client.update);
router.delete('/:id', verifyToken, client.delete);

module.exports = router;
