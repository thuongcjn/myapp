const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Post title is required']
    },
    body: {
        type: String,
        required: [true, 'Post body is required']
    }
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)