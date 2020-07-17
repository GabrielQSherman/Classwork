const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    
    const { JWT_SECRET: jwtKey, HEAD_AUTH_KEY: headerKey} = process.env;

    const userToken = req.headers[headerKey];

    try {
        
        const decodedData = jwt.verify(userToken, jwtKey);
        
        if (decodedData.id === undefined) throw new Error('Id was not defined in the payload')
        
        const admin = await User.findOne(
            {_id: decodedData.id}
        );
        
        if (admin === null) throw new Error('User id is invalid')

        const { _id, email: email, 'adminProps.isAdmin': isAdmin} = admin;

        const info = {
            id: _id,
            email: email,
            isAdmin: isAdmin,
        }

        console.log(info);

        if(info.isAdmin === false) throw new Error('')

        req.admin = info;

        next()

    } catch (err) {

        const errMsg = err.message || err;
        
        console.error(`\nError In AdminAuth: ${errMsg}\n`);

        return res.status(401).json({error: 'Not Authorized'})

    }

}






function project () {

    User.findOne( {  } )
}