const express = require('express');
const router = express.Router();
const city = require('../controllers/city.controller');
const { verifyToken } = require('../processing/auth');

router.post('/', verifyToken, city.create);
router.get('/', city.findAll);
router.get('/:id', verifyToken, city.findOne);
router.put('/:id', verifyToken, city.update);
router.delete('/:id', verifyToken, city.delete);

module.exports = router;