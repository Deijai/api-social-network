'use strict';
const mongoose = require('mongoose');

const FollowSchema = mongoose.Schema({
    followed: String,
    user: {
        type: mongoose.Schema.ObjectId, ref: 'User'
    }
});

module.exports = mongoose.model('Follow', FollowSchema);