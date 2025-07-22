const Post = require('../models/post.model')
const User = require('../models/user.model')

const asyncHandler = require('express-async-handler');

const getPosts = asyncHandler(async (req, res) => {
    // const posts = await Post.find({ userId: req.user.id }) || [];
    const posts = await Post.find() || [];
    res.status(200).json({ success: true, data: [...posts] });
})

const getPost = asyncHandler(async (req, res) => {
    const id = req.params.id
    const post = await Post.findById(id);
    if (!post) {
        throw new Error('Post not Found')
    }
    res.status(200).json({ success: true, data: post })
})

const createPost = asyncHandler(async (req, res) => {
    const { title, body } = req.body
    if (!title || !body) {
        res.status('400')
        throw new Error('Please fill all credentials')
    }
    const newPost = await Post.create({ userId: req.user.id, title, body })
    res.status(201).json({ success: true, data: newPost })
})

const updatePost = asyncHandler(async (req, res) => {
    const id = req.params.id
    const post = await Post.findById(id)
    if (!post) {
        res.status(404)
        throw new Error('Post not found')
    }
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }
    if (post.userId.toString() !== user.id) {
        res.status(404)
        throw new Error('Not authorized')
    }
    const { title, body } = req.body
    if (!title || !body) {
        res.status(400)
        throw new Error('Please fill all credentials')
    }
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true })
    res.status(200).json({ success: true, data: { ...updatedPost } })
})
const deletePost = asyncHandler(async (req, res) => {
    const id = req.params.id
    const post = await Post.findById(id)
    if (!post) {
        res.status(404)
        throw new Error('Post not found')
    }
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }
    if (post.userId.toString() !== user.id) {
        res.status(404)
        throw new Error('Not authorized')
    }
    await post.deleteOne()
    res.status(200).json({ success: true, message: `Post with id ${id} was deleted` })
})

module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}