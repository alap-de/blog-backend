const router = require('express').Router();

const PostController = require('../controller/post');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');

router.get('/', PostController.getPosts);
router.get('/:id', PostController.getPost);

router.post('/', auth, PostController.validate('createPost'), validate, PostController.createPost);
router.put('/:id', auth, PostController.validate('updatePost'), validate, PostController.updatePost);
router.delete('/:id', PostController.deletePost);

router.patch('/:id/comment', auth,PostController.validate('createComment'), validate, PostController.createComment);
router.patch('/:id/delete-comment', auth, PostController.validate('deleteComment'), validate, PostController.deleteComment);

module.exports = router;