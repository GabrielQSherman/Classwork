require('dotenv').config();

const PORT = process.env.PORT || 3000;

const express = require("express");
const cors = require('cors')
const server = express();

const databaseConnect = require('./databaseConnect')

databaseConnect()

server.use(cors())
server.use(express.json())


if (process.env.NODE_ENV === 'development') { 
    const morgan = require('morgan');
    server.use(morgan('dev'))
}

const usersRouter = require('./routes/users');
server.use('/users', usersRouter)

server.listen(PORT, () => {
  console.log('listening on port ' + PORT)
})

