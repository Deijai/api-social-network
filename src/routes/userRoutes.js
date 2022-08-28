'use strict';
const express = require('express');
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/authenticated');
const multipart = require('connect-multiparty');
const path = require('path');
const upload = multipart({ uploadDir: path.resolve(__dirname, '../uploads/users') });

const api = express.Router();

api.get('/test',  userController.test);
api.post('/save', authenticate.ensureAuth, userController.save);
api.get('/find', authenticate.ensureAuth, userController.getUsers);
api.get('/find/:id', authenticate.ensureAuth, userController.getUser);
api.patch('/edit/:id', authenticate.ensureAuth, userController.edit);
api.post('/avatar/:id', [authenticate.ensureAuth, upload], userController.uploadImage);

//signin
api.post('/signin', userController.signin);




module.exports = api;