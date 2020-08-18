const { Router } = require('express');

const  router = new Router();

const User = require('../models/User');

// const  userPost = require('./userPost.js');
// router.use('/post', userPost)

//@path LH user/login
//@desc login a user
//@access private 
router.patch(
    '/login',
    (req, res) => {

    console.log(req.body, 'Login Test');

    try {

        res.json({message: 'success!'})
            
    } catch (error) {

        console.error(error.message)

        res.status(500).json({
            message: error.message
        })
        
    }
})

//@ path: LH/user/register
//@ desp: make a new user document and stores their info to the database
//@ access: public
router.post(
    '/register', 
    async (req, res) => {
    //do this thing
    console.log('test', req.body);

    try {

        /*backend validation
            [] ensure email/username are not duplicates
            [] check password length
            [] validate email and username for constriants (before mongoose does for us)
        */
        //old way (deprecated)
        // const newUserDoc = new User(req.body);
        // await newUserDoc.save();

        //new way (perfered)
        await User.create(req.body);

        res.json({message: 'success!'});
        
    } catch (error) {

        res.status(500).json({
            message: error.message
        })
        
    }
    //do a thing after
})

//TODO create a GET route for finding all the users currently in DB
//@ path: LH/user/all
//@ desp: fetch all user data in the data, do not include sensitive user info
//@ access: public
router.get(
    '/all',
    async (req, res) => {
        
        try {
            const allUsers = await User.find({});

            // console.log(allUsers);

            res.json(allUsers);
            
        } catch (err) {
            const msg = err.message || err;
            console.error(msg);
            res.status(500).json({
                message: msg
            })          
        }   
    }
)

//@ path: LH/user/username/:username
//@ desp: fetch all user data in the data, do not include sensitive user info
//@ access: public
router.get(
    '/username/:un',
    async (req, res) => {

        try {

            const query = { username: req.params.un };

            const projection = { email: 1, username: 1, _id: 0};

            const foundUser = await User.findOne( query, projection );

            res.json(foundUser)
            
        } catch (err) {
            const msg = err.message || err;
            console.error(msg);
            res.status(500).json({
                message: msg
            })          
        }
    }
)
//make viewable to other files
module.exports = router;