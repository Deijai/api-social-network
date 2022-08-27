'use strict';
const express = require('express');
const cors = require('cors');

const app = express();

//load routes
const userRoutes = require('./routes/userRoutes')

//middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//cors
app.use(cors());




//routes
app.use('/api/user', userRoutes);

//exports
module.exports = app;



