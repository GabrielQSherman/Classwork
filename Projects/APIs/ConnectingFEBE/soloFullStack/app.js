require('dotenv').config();

//PACKAGES
const express = require('express');
const morgan = require('morgan');

// CONSTANTS
const port = process.env.PORT || 3000;
const URI = process.env.MONGO;

//IMPORT SELF CREATED MODULES/ROUTERS
const homeRouter = require('./routes/homeRouter');
const userRouter = require('./routes/userRouter');
const mongoConnect = require('./mongo/mongo-connect');
const simpleLog = require('./middleware/simpleLogger');

// MAIN APPLICATION VAR
const app = express()

app.use(express.static('static'));
app.use(simpleLog);

app.use('/', homeRouter)
app.use('/user', userRouter)

//START SERVER LISTENING
app.listen(port, () => {
    
    console.log(`Server is now listening on port ${port}`);
})

//CONNECT SERVER TO DATABASE
mongoConnect(URI)