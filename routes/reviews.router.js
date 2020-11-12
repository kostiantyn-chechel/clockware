const { verifyToken } = require('../processing/auth');

const express = require('express');
const router = express.Router();
const review = require('../controllers/review.controller');

router.get('/', review.verify);
router.get('/master', verifyToken, review.reviews);
router.post('/', review.create);

module.exports = router;