require('dotenv').config();

const express = require('express'),
      morgan = require('morgan'),
      mongoose = require('mongoose'),

      app = express(),

      PORT = process.env.PORT;



app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
    
})