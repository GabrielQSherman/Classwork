///import env vars
require('dotenv').config();
//global variables for this server
const 
express = require('express')
server = express(),
morgan = require('morgan'),
mongoose = require('mongoose'),
port = process.env.PORT || 3001,
deprecatedObj = { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true},
connectionURI = process.env.MONGO,
homeRouter = require('./routes/homeRouter'),
movieRouter = require('./routes/movieRouter'),
userRouter = require('./routes/userRouter');
//some middleware needs to go before others
server.use(morgan('dev'));
server.use(express.json());

// server.use(express.static('./public'));

server.set('view engine', 'pug')

server.use( express.static('./public'));
// server.use( express.static('./node_modules'));


//express.json and morgan must be called before in expressInstance.use()
server.use('/', homeRouter);
server.use('/movie', movieRouter);
server.use('/user', userRouter);
//connect to mongoose
mongoose.connect(connectionURI, deprecatedObj, () => {
    console.log('The Server Is Connected To The Database');
})
//if err
mongoose.connection.on('error', (err) => {

    console.log('An error occured trying to connect to MongoDB, Error: ' + err);    
})
//when connection
mongoose.connection.on('connected', () => {

    console.log('The server is attempting to connect to the database...');
    
})
//listen
server.listen( port, () => {
    console.log(`Server Listening on Port: ${port}`);
})