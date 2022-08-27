'use strict';
const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    message: String,
    created_at: String,
    emitter: {
        type: mongoose.Schema.ObjectId, ref: 'User'
    },
    receiver:  {
        type: mongoose.Schema.ObjectId, ref: 'User'
    }
});

module.exports = mongoose.model('Message', MessageSchema);