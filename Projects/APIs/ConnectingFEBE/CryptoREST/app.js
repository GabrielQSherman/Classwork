//This line is required before PORT is defined
require('dotenv').config();

//exporting the port number so it can be used in anyfile
//doing it before other code so it will be accessable in all Router scripts

const PORT = process.env.PORT || 3000,

      JWT_KEY = process.env.KEY || 'jwtkey',

      CRYPTO_KEY = process.env.CRYPTO_KEY, //in order for the crypto api to be intergrated one must have their own Nomics API key

      exported = {
          port: PORT,
          jwtKey: JWT_KEY,
          cryptoKey: CRYPTO_KEY
      };

module.exports = exported; //this line needs to be before router middleware

      //import required packages
const express = require('express'),
      morgan = require('morgan'),

      //instance of express is the core of this server
      app = express(),

      //getting mongodb endpoint from enviorment file
      dbURI = process.env.MONGO;      

//set templating/view engine for the response.render method 
app.set('view engine', 'pug');

//Middleware for all routes

app.use(morgan('dev')); //makes a log in the server console for every request

app.use(express.json()) //allow json data for request.body

app.use(express.static(process.cwd()+'/public')); //set directory for static files

//Routers are used for their specified routes

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