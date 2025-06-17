const Post = require('../models/post.model')

const asyncHandler = require('express-async-handler');

const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({});
    res.status(200).json(posts);
})

const getPost = asyncHandler(async (req, res) => {
    const id = req.params.id
    const post = await Post.findById(id);
    res.status(200).json(post)
})

const createPost = asyncHandler(async (req, res) => {
    const { title, body } = req.body
    if (!title || !body) {
        res.status('400')
        throw new Error('Please fill all credentials')
    }

    const newPost = await Post.create({ title, body })
    res.status(201).json(newPost)
})

const updatePost = asyncHandler(async (req, res) => {
    const id = req.params.id
    const { title, body } = req.body
    if (!title || !body) {
        res.status('400')
        throw new Error('Please fill all credentials')
    }
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {new: true})
    res.status(200).json(updatedPost)
})
const deletePost = asyncHandler(async (req, res) => {
    const id = req.params.id
    const post = await Post.findById(id);
    if (!post) {
        res.status(404);
        throw new Error(`Post with id ${id} not found`)
    }
    await post.deleteOne()
    res.status(200).json({ message: `Post with id ${id} was deleted` })
})

module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}