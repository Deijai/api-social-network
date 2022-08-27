'use strict';
const express = require('express');
const userController = require('../controllers/userController');

const api = express.Router();

api.get('/test', userController.test);
api.post('/save', userController.save);




module.exports = api;