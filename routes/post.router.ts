import * as express from 'express';
const { verifyToken } = require('../processing/auth');
const post = require('../controllers/post.controller');

const router = express.Router();

router.get('/', post.allPost);
router.post('/', post.addPost);
router.put('/:id', post.updatePost);
router.delete('/:id', post.deletePost);

module.exports = router;

