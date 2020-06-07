const jwt = require('jsonwebtoken'),
      key = require('../app').jwtKey; 

async function logged(req) {

    //get the token from the request
    const clientToken = req.headers['auth-token'];

    if (clientToken && await jwt.verify(clientToken, key)) { //if it was included in the req it must be verified
        
        return true

    } else {
        
        return false
    }
    
}

module.exports = logged