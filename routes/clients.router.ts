import * as express from 'express';
const client = require('../controllers/client.controller');
const { verifyToken } = require('../processing/auth');
const router = express.Router();

router.post('/', verifyToken, client.createClient);
router.get('/', verifyToken, client.findAllClient);
router.get('/list', verifyToken, client.list);
router.put('/:id', verifyToken, client.updateClient);
router.delete('/:id', verifyToken, client.deleteClient);

module.exports = router;
