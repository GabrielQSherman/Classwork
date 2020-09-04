const User = require('../models/User');

const validator = require('validator').default;


module.exports = async ( req, res, next ) => {

    try {
        /*backend validation
        [*] ensure email/username are not duplicates
        [*] check password length
        [*] validate email and username for constriants (before mongoose does for us)
        */
        const validationErrors = [];

        const { email: e, username: u, password: p } = req.body;

        //checks if the data given is empty
        if (e === undefined || e.trim().length === 0) validationErrors.push({key: 'email', error: 'Email Required'})
        if (u === undefined || u.trim().length === 0 ) validationErrors.push({key: 'username', error: 'Username Required'})
        if (p === undefined || p.trim().length === 0 ) validationErrors.push({key: 'password', error: 'Password Required'})
        
        if ( e != undefined && !validator.isEmail(e) ) {
            validationErrors.push({key: 'email', error: 'Must Be Valid Email Address'})
        }

        //ensure email are not duplicatated/ in the DB already
        const emailExist = await User.findOne({email: e}) !== null;
        if ( emailExist ) {
            validationErrors.push({key: 'email', error: 'Email In Use'})
        } 
        
        //ensure username are not duplicatated/ in the DB already
        const usernameExist = await User.findOne({username: u}) !== null;
        if ( usernameExist ) {
           validationErrors.push({key: 'username', error: 'Username In Use'})
        } 

       //check the length of the password
       if ( p != undefined && p.length < 7) {  
            validationErrors.push({key: 'password', error: 'Password Did Not Meet Requirements'})
       } 

        //if validationErrors array has than 0 elms res with 400 and res with the array of errors
       if (validationErrors.length > 0) {
           res.status(400).json({
               valErrors: validationErrors
           })
       } else {

            //sanitize individual fields
            const 
            username = u.trim(),
            email = e.trim(),
            password = p.trim(),

            //1) create a new object, only include the fields we need (user, email, password)
            sanitizedData = {
                username: username,
                email: email,
                password: password,
            }

            req.newUser = sanitizedData
            //2) remove unneeded/security risking fields
            
            // //its defined on our frontend form
            // delete req.body.password2 

            // //could possbily be sent via Postmans
            // delete req.body.emailValidated
            

            next()
       }

    } catch (error) {
        res.status(500).json({
            message: error.message || 'Unknown Error',
            error: error
        })
    }

}