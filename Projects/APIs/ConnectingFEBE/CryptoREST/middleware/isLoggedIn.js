const jwt = require('jsonwebtoken'),
      key = require('../app').jwtKey; 

async function logged(req) {

    try {

        //get the token from the request
        const clientToken = req.headers['auth-token'];

        const data = await jwt.verify(clientToken, key);

        if (clientToken && data) { //if it was included in the req it must be verified
            
            return data

        } else {
            
            return false
        }
        
    } catch (err) {

        console.log(`\n\nError in 'isLoggedIn': ${err.message}\n`);
        
        return false
    }
    
    
}

module.exports = logged