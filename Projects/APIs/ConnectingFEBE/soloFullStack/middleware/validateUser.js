const User = require('../models/User');
const validator = require("validator");

const msgs = {
    emailInUse: 'Email Already In Use',
    emailVaild: 'Valid Email Required',
    userChars: "Username Must Use Alphanumeric Characters Only",
    userInUse: "Username Already In Use",
    legthInvalid: (feild) => {
        return `The Given ${feild} Did Not Meet Length Requirements`
    }
}

const validate = async (req, res, next) => {

    const { email: e, password: p, username: u } = req.body;

    failedValues = [];

    if (!validator.isEmail(e)) {
        failedValues.push({
            key: "email",
            message: msgs.emailVaild
        })
    }

    const emailInUse = await User.findOne({ email: e }) != null;
    if (emailInUse) {
        failedValues.push({
            key: "email",
            message: msgs.emailInUse
        })
    }

    if (e != undefined && e.length < 6 || e.length > 254) {
        failedValues.push({
            key: "email",
            message: msgs.legthInvalid('Email')
        })
    }

    if (username == undefined || username.trim().length == 0 || !validator.isLength(username, { min: 3, max: 21 })) {
        failedValues.push({
            key: "username",
            message: msgs.legthInvalid('Username')
        })
    } else if ( !validator.isAlphanumeric(username, 'en-US') ) {

        failedValues.push({
            key: "username",
            message: msgs.userChars
        })
    } 
    
    const userInUse = await User.findOne({ username: u }) != null;
    if (userInUse) {
        failedValues.push({
            key: "username",
            message: msgs.userInUse
        })
    }

    if ( !validator.isLength(pass, { min: 7, max: 1000 }) ) {
        failedValues.push({
            key: "password",
            message: msgs.legthInvalid('Password')
        })
    }

    if (failedValues.length > 0) {
        res
            .status(400)
            .json({
                validation_error: failedValues
            })
    } else {

        req.userData = {
            email: e,
            username: u,
            password: p,
        }
        next()

    }

}

module.exports = validate;