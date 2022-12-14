'use strict';
const mongoose = require('mongoose');

const PublicationSchema = mongoose.Schema({
    post: String,
    file: String,
    created_at: String,
    user: {
        type: mongoose.Schema.ObjectId, ref: 'User'
    }
});

module.exports = mongoose.model('Publication', PublicationSchema);