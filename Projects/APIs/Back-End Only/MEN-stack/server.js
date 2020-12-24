const express = require("express");

const server = express();

const morgan = require('morgan');
const firstMiddleware = require('./middlewares/firstMiddleware')

server.use(morgan('dev'))
server.use(firstMiddleware);

server.get("/test", (request, response) => {
  response.send("Testing Testing 1, 2, 3")
})

server.listen(3003, () => {
  console.log('listening on port 3003')
})