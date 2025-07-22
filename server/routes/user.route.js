const router = require("express").Router();
const { getUsers,
    getUser,
    loginUser,
    registerUser,
    aboutUser
} = require('../controllers/user.controller')
const auth = require('../middlewares/auth.middleware')

router.route('/').get(getUsers).post(registerUser);
router.route('/:id').get(getUser)
router.get('/me', auth, aboutUser)
router.post('/login', loginUser)

module.exports = router;
