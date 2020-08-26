const { Router } = require('express');

const  router = new Router();

const User = require('../models/User');

const findUser = require('../middleware/findUser');
const { findByIdAndUpdate, findOneAndUpdate } = require('../models/User');
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
    
    const { email: e, username: u, password: p } = req.body;

    if (e === undefined || u === undefined || p === undefined) {
        return res.status(400).json({
            message: 'Fields missing needed to create account'
        })
    }

    try {

        /*backend validation
        [*] ensure email/username are not duplicates
        [] check password length
        [] validate email and username for constriants (before mongoose does for us)
        */
        const validationErrors = [];
        
        const emailExist = User.findOne({email: e}) !== null;
        if ( emailExist ) validationErrors.push({key: 'email', error: 'Email In Use'})
        
        const usernameExist = User.findOne({username: u}) !== null;
        if ( usernameExist ) validationErrors.push({key: 'username', error: 'Username In Use'})

        if ( p.length < 7) validationErrors.push({key: 'password', error: 'Password Did Not Meet Requirements'})
        //old way (deprecated)
        // const newUserDoc = new User(req.body);
        // await newUserDoc.save();

        //if this array has than 0 elms res with 400 and res with the array of errors

        //new way (perfered)
        await User.create(req.body);

        res.status(201).json({message: 'success!'});
        
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
            console.log('test');
            const allUsers = await User.find({});

            console.log(allUsers);


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

//put /updateinfo/:id *uses req.body to pass moddifying values of user
// what do we want want to update, how is that info being passed to the REST api?
//@ path: PUT LH/user/updateinfo/:id
//@ desp: fetch all user data in the data, do not include sensitive user info
//@ access: public
router.put(
    '/update/:id',
    findUser,
    async (req, res) => {

        try {

            const updated = await User.findByIdAndUpdate( 
                req.params.id, 
                req.body,
                {new: true}
            );
            
            res.json({
                updateDoc: updated
            })
            
        } catch (err) {
            const msg = err.message || err;
            console.error(msg)
            res.status(500).json({
                message: msg
            })
        }

    }
)



















//delete /delete/:id ( mongodb docuement id )
router.delete(
    '/delete/:id',
    findUser,
    async ( req, res ) => {

        try {

            await User.findByIdAndDelete(req.userId);

            res.send('Deleted User!')
            
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