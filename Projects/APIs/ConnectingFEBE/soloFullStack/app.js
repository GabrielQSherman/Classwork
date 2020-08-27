require('dotenv').config();

//PACKAGES
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

// CONSTANTS
const port = process.env.PORT || 3000;
const URI = process.env.MONGO;
// MAIN APPLICATION VAR
const app = express()

app.use(express.static('static'))

const homeRouter = require('./routes/homeRouter')
app.use('/', homeRouter)

//START SERVER LISTENING
app.listen(port, () => {
    
    console.log(`Server is now listening on port ${port}`);
})