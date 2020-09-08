const validate = require('validator').default;

const bcrypt = require('bcrypt');

const User = require('../models/User');

module.exports = async ( req, res, next ) => {

    try {

        const { password, credential } = req.body;

        if (password == undefined || credential == undefined  ) {
            return res.status(400).json({message: 'Credentials Do Not Match'})
        }

        const p = password.trim();
        const c = credential.trim();

        //first is the user logging in with their email or their username?
        const field = validate.isEmail(c) ? 'email' : 'username';
        
        //if email? check that the email is in use
        //if username? check that the username is in use
        const query = {};
        query[field] = c;
        
        const projection = {password: 1};

        const foundUser = await User.findOne(query, projection); //return obj with two props. password & _id

        if (foundUser == null) {
            return res.status(400).json({message: 'Credentials Do Not Match'})
        }
        
        const passwordMatches = bcrypt.compare(p, foundUser.password); //return a boolen (true if the password matches)

        //if pass matches, then go to next middleware, otherwise send a general message 'failed login'
        if (!passwordMatches) {
            return res.status(400).json({message: 'Credentials Do Not Match'})
        }

        //at this point we have confirmed the user's credentials matches and they can be logged in
        req.userId = foundUser._id;
        
        next()

        
    } catch (err) {
        console.error(err.message || err)
        res.json({
            message: err.message,
            error: err
        })
    }

}