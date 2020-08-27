require('dotenv').config();

//PACKAGES
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
//MIDDLES
const firstMid = require('./middleware/firstMiddleware');
//ROUTERS
const homeRouter = require('./routes/homeRouter');
const userRouter = require('./routes/userRouters');

// CONSTANTS
const port = process.env.PORT || 3000;
const URI = process.env.MONGO;
//MAIN APPLICATION VAR
const app = express();

//START SERVER LISTENING
app.listen(port, () => {
    
    console.log(`Server is now listening on port ${port}`);
})