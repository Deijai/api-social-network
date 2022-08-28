'use strict';
const express = require('express');
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/authenticated');

const api = express.Router();

api.get('/test',  userController.test);
api.post('/save', authenticate.ensureAuth, userController.save);
api.get('/find', authenticate.ensureAuth, userController.getUsers);
api.get('/find/:id', authenticate.ensureAuth, userController.getUser);

//signin
api.post('/signin', userController.signin);




module.exports = api;