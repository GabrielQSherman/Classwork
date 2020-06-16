const jwt = require('jsonwebtoken'),
      key = require('../app').jwtKey;

async function verify(req, res, next) {

    try {

        //get the token from the request
        const clientToken = req.headers['auth-token'];

        if (clientToken) { //if it was included in the req it must be verified
            
            const userData = await jwt.verify(clientToken, key);

            req.user = userData;

            next()

        } else {
            res.json({
                status: 403,
                message: 'No auth token provided, this route requires authorization'
            })
        }

        
    } catch (err) {
        res.status(500).json({
            message: `Error Occured: ${err.message}`,
            full_error_report: err
        })   
    }
    
    
}

module.exports = verify;