const User = require('../models/User');
const validator = require("validator");

const validate = async (req, res, next) => {

  const email = req.body.email,
        pass = req.body.password,
        username = req.body.username,
        failedValues = [];
        
        if (!validator.isEmail(email)) {
            failedValues.push({
                key: "email",
                message: "Valid Email Required"
            })
        }

        const emailExist = await User.findOne({ email: email }) != null; //expected outcome: boolean

        if (emailExist) {
            failedValues.push({
                key: "email",
                message: "Email Already In Use"
            })
        }

        const usernameExist = await User.findOne({ username: username }) != null; //expected outcome: boolean

        if (usernameExist) {
            failedValues.push({
                key: "username",
                message: "Username Already In Use"
            })
        }

        if ( 

            !validator.isLength(username, {min: 3, max: 20}) 
            || !validator.isAlphanumeric(username, 'en-US') 

        ) {
            failedValues.push({
                key: "username",
                message: "Length Failed Requirements OR Used Invalid Characters"
            })
        }

        if ( 

            !validator.isLength(pass, {min: 7, max: 100}) 
            || !validator.isAlphanumeric(pass, 'en-US') 

        ) {
            failedValues.push({
                key: "password",
                message: "Length Failed Requirements OR Used Invalid Characters"
            })
        }

        if (failedValues.length > 0) {
            res
            .status(400)
            .json({
                validation_error: failedValues
            })
        } else { next() }

}

module.exports = validate;