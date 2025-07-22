const router = require('express').Router()
const { getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
} = require('../controllers/post.controller')
const auth = require('../middlewares/auth.middleware')

// router.get('/', auth, getPosts)
// router.get('/:id', auth, getPost)
router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/', auth, createPost)
router.put('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)

module.exports = router;