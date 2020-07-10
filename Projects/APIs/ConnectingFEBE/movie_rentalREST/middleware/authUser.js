const User = require("../models/User");
const validator = require("validator");
const bcrypt = require("bcrypt");


const failedLogin = ( req, res) => {
    return res.status(409).json({message: "Login Failed"});
}

module.exports = async (req, res, next) => {

    try {
        const email = req.body.email,
              emailValid = 
            (email === undefined || email.trim() === '')
                ? false
                : validator.isEmail(email);

        if (!emailValid) {
            console.error('\nLogin Failed: Email Not Valid');
            failedLogin()    
        }

        const user = await User.findOne({email: req.body.email});

        if (user === null) {
            console.error('\nLogin Failed: Email Not In Use');
            failedLogin()
        }
        const pass = req.body.password,
              passTest = 
            (pass === undefined || pass.trim() === '') 
                ? false 
                : await bcrypt.compare(pass, user.password);

        if (!passTest) {
            console.error('\nLogin Failed: Password Invalid');
            failedLogin()
        }

        req.id = user._id;

        next() //if code execution reaches here, it is assumed the user has successfully logged in
        
    } catch (err) {
        res.status(500).json({
            errorAt: err.stack,
            message: err.message || 'err'
        })
    }
}
