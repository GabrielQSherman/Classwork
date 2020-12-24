require('dotenv').config();
const PORT = process.env.PORT;

const express = require("express");

const server = express();

const morgan = require('morgan');
const firstMiddleware = require('./middlewares/firstMiddleware')
const nasaRouter = require('./routes/nasa');

server.use(morgan('dev'))
server.use(firstMiddleware)

server.use('/nasa', nasaRouter)

server.listen(3003, () => {
  console.log('listening on port ' + PORT)
})