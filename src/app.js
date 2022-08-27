'use strict';
const express = require('express');
const cors = require('cors');

const app = express();

//load routes

//middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//cors
app.use(cors());




//routes
app.get('/api', (req, res) => {
    res.json({ok: true})
})


//exports
module.exports = app;



