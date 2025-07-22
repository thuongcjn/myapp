const User = require('../models/user.model');
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.status(200).json(users)
})

const getUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id).select('userName')
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }
    res.status(200).json({ success: true, data: user })
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error('Please fill all credentials')
    }
    const user = await User.findOne({ email })
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }
    if (!(await bcrypt.compare(password, user.password))) {
        res.status(401)
        throw new Error('Not authorized')
    }
    res.status(200).json({
        success: true,
        data: {

            _id: user.id,
            userName: user.userName,
            email: user.email,
            token: generateToken(user.id)
        }
    })
})

const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body
    if (!userName || !email || !password) {
        res.status(400);
        throw new Error('Please, fill all fields')
    }
    if (await User.findOne({ email })) {
        res.status(400)
        throw new Error('User already exists')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
        userName,
        email,
        password: hashedPassword,
    })
    if (!newUser) {
        res.status(400)
        throw new Error('An error occured')
    }
    res.status(201).json({
        success: true, data: {
            userName,
            email,
            token: generateToken(newUser._id)
        }
    })
})

const aboutUser = asyncHandler(async (req, res) => {
    const { _id, userName, email } = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        userName,
        email
    })
})

const generateToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
    return token;
}

module.exports = {
    getUsers,
    getUser,
    loginUser,
    registerUser,
    aboutUser
};