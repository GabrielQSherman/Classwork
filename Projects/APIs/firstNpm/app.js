require('dotenv').config();

//PACKAGES
const express = require('express');
const mongoose = require('mongoose');
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

// MIDDLEWARES/ROUTERS IN USE

// MIDDLEWARE THAT ALL ROUTES USE 
// (regardless of request-path or method) '/' /username
app.use(express.json());
app.use(express.static('public'));

app.use(firstMid);

//USING A ROUTER
app.use('/', homeRouter);
app.use('/user', userRouter);

if (typeof URI === 'string') {
    
    const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

    //CONNECTION TO DATABASE
    mongoose.connect(URI, mongoOptions, (err) => {
        
        if (err) {

            console.error( `\nError Connecting To MongoDB: ${err.message || err}\n`);

        } else {
            console.log('Server Connected To DB') 
        }

    })


} else {

    console.error('Mongo URI missing or invalid, check node enviorment variables');
    
}

//START SERVER LISTENING
app.listen(port, () => {
    
    console.log(`Server is now listening on port ${port}`);
})