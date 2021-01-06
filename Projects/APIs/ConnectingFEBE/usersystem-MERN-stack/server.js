require('dotenv').config();

const PORT = process.env.PORT || 3000;

const express = require("express");

const server = express();

const databaseConnect = require('./databaseConnect')

databaseConnect()

server.use(express.json())
if (process.env.NODE_ENV === 'development') { 
    const morgan = require('morgan');
    server.use(morgan('dev'))
}

const firstMiddleware = require('./middlewares/firstMiddleware')
const nasaRouter = require('./routes/nasa');

server.use(firstMiddleware)

server.use('/nasa', nasaRouter)

server.listen(PORT, () => {
  console.log('listening on port ' + PORT)
})