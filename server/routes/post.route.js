const router = require('express').Router()
const { getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
} = require('../controllers/post.controller')
const auth = require('../middlewares/auth.middleware')

router.get('/', auth, getPosts)
router.post('/', auth, createPost)
router.get('/:id', auth, getPost)
router.put('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)

module.exports = router;