'use strict';
const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'DMASYSTEM_2022';

exports.createToken = (user) => {
    const payload = {
        sub: user._id,
        surname: user.name,
        nick: user.nick,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(1, 'days').unix(),
    }

    return jwt.encode(payload, secret);
}