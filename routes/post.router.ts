import * as express from 'express';
const { verifyToken } = require('../processing/auth');
const post = require('../controllers/post.controller');

const router = express.Router();

router.get('/', post.allPost);
router.post('/', post.addPost);
router.put('/');
router.delete('/');

module.exports = router;

