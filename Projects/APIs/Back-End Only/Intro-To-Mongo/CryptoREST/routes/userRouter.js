const express = require('express'),

      mongoose = require('mongoose'),

      userSchema = require('../models/User'),

      router = express(),

      bcrypt = require('bcryptjs'),

      regUser = require('../middleware/registerUser'),

      loginUserVal = require('../middleware/loginValidate'), 
      
      serverPort = require('../app').port;

//GET REQUESTS

router.get('/', (req, res) => {

    res.json({
        all_users: `http://localhost:${serverPort}/user/all`,
        one_user: `http://localhost:${serverPort}/user/<db_id>`,
    })
})

router.get('/all', async (req, res) => {

    let allUsers = await userSchema.find();
    res.json({
        all_users: allUsers
    })
})

router.get('/:id', findUser, async (req, res) => {

    res.status(200).json({
        message: 'User Found',
        user: req.loginUser
    })

})

//REGISTER/POST A NEW USER IN DB
router.post('/register', regUser,  async (req, res) => {

    try {

        const newUser = new userSchema(req.body);

        //hash users password for safe database storing
              salt = await bcrypt.genSalt(7),

              hashedPass = await bcrypt.hash(req.body.password, salt);

        //before saving the a hashed version of the password (more secure)
        // will replace the password the user will remember
        newUser.password = hashedPass;


        await newUser.save();

        res.status(201).json({
            message: 'New user created',
            user: newUser
        });

    } catch (err) {

        res.json({
            message: err.message,
            error: err,
            status: 500
        })
    }
})

router.post('/login', loginUserVal, async (req, res) => {

    //see if the email belongs to a registered user, stores the document in this var if it does exist
    const loginUser = await userSchema.findOne({email: req.body.email});

    // NOTE: for the message of the next two response.json() it is best to use vauge language to make it more difficult to hack users accounts, this project is purely educational
    //if it doesnt exist a response is made
    if (!loginUser) {
        res.status(400).json({
            status: 400,
            message: 'That email is not registered, check spelling and try again.'
        })

        return
    }

    //bcrypt.compare takes the string (req.body.password), and makes a comparison to a hashed string, (document.password)
    const passVal = await bcrypt.compare(req.body.password, loginUser.password)
    //password was not vaild for the given user
    if (!passVal) {
        res.status(400).json({
            status: 400,
            message: 'The given password was incorrect'
        })

        return
    }

    res.send('login went through')
})

//PATCH A USER
router.patch('/:id', findUser, async (req, res) => {

    try {

        const id = req.params.id;

        await userSchema.update({_id: id}, req.body);

        let updateUser = await userSchema.find({_id: id});

        res.status(201).json({
            message: 'User successfuly updated',
            update_user: updateUser
        });

    } catch (err) {

        res.json({
            message: err.message,
            error: err,
            status: 500
        })
    }
})

//DELETE A USER
router.delete('/:id', findUser, async (req, res) => {

    try {

        let user = req.loginUser;

        await userSchema.findByIdAndDelete({_id: req.params.id});

        res.status(200).json({
            message: 'User successfully deleted',
            deleted_user: user
        })

    } catch (err) {

        res.status(500).json({
            message: `Error Occured: ${err.message}`,
            full_error_report: err
        })   
    }
})

//MIDDLEWARE
async function findUser(req, res, next) {

    try {

        const id = req.params.id;

        req.loginUser = await userSchema.find({_id: id});

        if (req.loginUser) {

            next()

        } else {
            res.status(404).json({
                message: 'No user found'
            })
        }
        
    } catch (err) {
        res.status(500).json({
            message: `Error Occured: ${err.message}`,
            full_error_report: err
        })
    } 
}

module.exports = router;