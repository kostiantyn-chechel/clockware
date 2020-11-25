const express = require('express');
const router = express.Router();
const master = require('../controllers/master.controller');
const { verifyToken } = require('../processing/auth');

router.post('/', verifyToken, master.create);
router.get('/', verifyToken, master.findAll);
router.get('/find', master.findAllFreeMasters);
router.get('/:id', verifyToken, master.findOne);
router.put('/:id', verifyToken, master.update);
router.delete('/:id', verifyToken, master.delete);

module.exports = router;
