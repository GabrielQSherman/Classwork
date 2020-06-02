require('dotenv').config();

const express = require('express'),

      server = express(),

      morgan = require('morgan'),

      mongoose = require('mongoose'),

      port = process.env.PORT || 3001,

      deprecatedObj = { useUnifiedTopology: true, useNewUrlParser: true},

      connectionURI = process.env.MONGO;


mongoose.connect(connectionURI, deprecatedObj, () => {
    
    console.log('The Server Is Connected To The Database');
    
})

mongoose.connection.on('error', (err) => {

    console.log('An error occured trying to connect to MongoDB, Error: ' + err);
    
})

mongoose.connection.on('connected', () => {

    console.log('The server is attempting to connect to the database...');
    
})


server.listen( port, () => {

    console.log('Server Listening on Port: ' + port);
    
})

