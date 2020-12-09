import * as express from 'express';
const router = express.Router();
const review = require('../controllers/review.controller');
const { verifyToken } = require('../processing/auth');

router.get('/', review.verify);
router.get('/master', verifyToken, review.reviews);
router.post('/', review.create);

module.exports = router;