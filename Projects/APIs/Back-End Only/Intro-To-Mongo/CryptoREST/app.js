//This line is required before PORT is defined
require('dotenv').config();

//exporting the port number so it can be used in anyfile
//doing it before other code so it will be accessable in all Router scripts

const PORT = process.env.PORT || 3000,

      KEY = process.env.KEY || 'jwtkey',

      exported = {
          port: PORT,
          jwtKey: KEY
      };

module.exports = exported; //this line needs to be before the router middleware

const express = require('express'),
      morgan = require('morgan'),

      app = express(),

      dbURI = process.env.MONGO;      

app.set('view engine', 'pug');

app.use(morgan('dev'));

app.use(express.json())

app.use(express.static(process.cwd()+'/public'));

const homeRouter = require('./routes/homeRouter')
app.use('/', homeRouter);

const userRouter = require('./routes/userRouter')
app.use('/user', userRouter);

const cryptoRouter = require('./routes/cryptoRouter')
app.use('/crypto', cryptoRouter)


//Connecting to the Mongo Database

//get script from external src
const connect_to_DB = require('./mongo/connect');

//run the function that connects the DB to the server
connect_to_DB(dbURI)

//specify port for server to listen on

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
    
})


