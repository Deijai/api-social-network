'use strict';
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    surname: String,
    nick: String,
    email: String,
    password: String,
    image: String,
    role: String,
});

module.exports = mongoose.model('User', UserSchema);