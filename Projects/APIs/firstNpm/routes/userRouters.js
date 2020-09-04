const { Router } = require('express');

const  router = new Router();

const User = require('../models/User');

const findUser = require('../middleware/findUser');

const validateReg = require('../middleware/validateRegister');

const passEncrypt = require('../middleware/passEncrypt');
// const  userPost = require('./userPost.js');
// router.use('/post', userPost)

//@path LH user/login
//@desc login a user
//@access private 
router.patch(
    '/login',
    //check the users credentials, make sure they match whats in the DB
    //create a JWT
    //send the JSON to the FE
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
    validateReg,
    passEncrypt,
    async (req, res) => {
    try {

        //old way (deprecated)
        // const newUserDoc = new User(req.body);
        // await newUserDoc.save();

        //new way (perfered)

        // req.newUser is defined in the validateReq middleware and passed to this function
        await User.create(req.newUser);

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