const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    
    const { JWT_SECRET: jwtKey, HEAD_AUTH_KEY: headerKey} = process.env;

    const userToken = req.headers[headerKey];

    try {
        
        const decodedData = jwt.verify(userToken, jwtKey);
        
        if (decodedData.id === undefined && decodedData.id.length != 24 ) { 
            throw new Error('ID was not defined in the payload OR the length was invalid')
        }

        const query = {_id: decodedData.id, 'adminProp.isAdmin': true},
              projection = {password: 0, __v: 0}
        
        const admin = await User.findOne(
            query, projection
        );
        
        if (admin === null) throw new Error('User is not an admin')

        req.admin = admin;

        next()

    } catch (err) {

        const errMsg = err.message || err;
        
        console.error(`\nError In AdminAuth: ${errMsg}\n`);

        return res.status(401).json({error: 'Not Authorized'})

    }

}