const User = require("../models/User");
const router = require("express").Router();
const validator = require("validator");

const validateUser = require('../middleware/validateUser');

//POST route for Users
//localhost:4000/user
//@desc post/make a new user and store in users collection
//@path (server path)/user/post
//@access adminLevel 2
router.post(
    "/", 
    validateUser,
    async (req, res) => {

        //not allow a user to bypass admin level and isAdmin

        
        try {

            const newUser = await User.create(req.body);

            res.json({
                msg: "user created successfully",
                document: newUser
            });
            
        } catch (error) {
            res
            .status(500)
            .json({error: error.message || error});
        }
    
})

module.exports = router;