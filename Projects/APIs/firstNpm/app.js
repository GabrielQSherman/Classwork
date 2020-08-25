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

// MIDDLEWARES/ROUTERS IN USE

// MIDDLEWARE THAT ALL ROUTES USE 
// (regardless of request-path or method) '/' /username
app.use(express.static('public'));
app.use(express.json());
app.use(firstMid);
app.use(morgan('dev'));

//USING A ROUTER
app.use('/', homeRouter);
app.use('/user', userRouter);

if (typeof URI === 'string') {
    
    const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };

    //CONNECTION TO DATABASE
    //Clusters (only need one)
    //Databases (one per project)
    //Collections (one per docuement type ie Users, Movies, Patients, Foods)
    //Documents ( Familiar Object Notation ) ex { _id: *value auto assigned by Mongo, 24 chars. , __v: version, (created/updated)At, username: 'user1', password: *hashedPass }

    mongoose.connect(URI, mongoOptions, (err) => {
        
        if (err) {

            console.error( `\nError Connecting To MongoDB: ${err.message || err }\n`);

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