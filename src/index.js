'use strict';
const mongoose = require('mongoose');
const app  = require('./app');
const port  = 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/social-network', {
    useNewUrlParser: true
}).then( () => {
    console.log('====================================');
    console.log('connected success...');
    console.log('====================================');

    //create server
    app.listen( port, () => {
        console.log('connected port', port);
    } )
}).catch( ( err ) => {
    console.log('====================================');
    console.log('Error: ', err);
    console.log('====================================');
});
