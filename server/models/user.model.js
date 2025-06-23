const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Please fill user name']
    },
    email: {
        type: String,
        required: [true, 'Please fill user email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please fill user password']
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);