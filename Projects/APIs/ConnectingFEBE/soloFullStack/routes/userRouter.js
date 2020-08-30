const router = require('express').Router();

const validateUser = require('../middleware/validateUser');

const User = require('../models/User');

//test route for user router
router.get('/', (req, res) => {

    res.send('trying to get users?')

})

//@path: POST *server*/user/register
//@desc: handels user registration, will upload a new User document to MongoDB.
//@access: public 
router.get(
    '/register', 
    validateUser, 
    (req, res) => {
        try {

            //req.userData is defined by the validation middleware
            const newUser = await User.create(req.userData);
            res.status(201).json(newUser);

        } catch (err) {
            res.status(500).json({
                message: err.message,
                error: err
            })
        }
    }

)

module.exports = router