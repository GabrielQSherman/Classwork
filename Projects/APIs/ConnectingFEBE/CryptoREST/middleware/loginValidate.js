const Users = require('../models/User');


async function reg(req, res, next) {
    
    //store request's body in a var
    const info = req.body;
    //arr to store missing values in body
    let missing = [];

    if (info.email == undefined) {
        missing.push('email')
    } 

    if (info.password == undefined) {
        missing.push('password')
    } 
    //send a res/stop the req/res cycle if a required value is missing
    if (missing.length > 0 ) {
        
        res.status(400).json({
            status: 400,
            message: 'The request was missing the following properties in the request\'s body',
            missing_props: missing,

        })

        return
    }

    next()
}

module.exports = reg;