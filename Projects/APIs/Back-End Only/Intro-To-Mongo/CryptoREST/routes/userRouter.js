//IMPORTING...

const
     //PACKAGES
      express = require('express'),

      userSchema = require('../models/User'),

      jwt = require('jsonwebtoken'),
      
      bcrypt = require('bcryptjs'),
      
      //INSTANCE OF EXPRESS ROUTER OBJ
      router = express.Router(),
      
      //IMPORTED VARS
      jwtKey = require('../app').jwtKey,

      serverPort = require('../app').port;

      //MIDDLEWARE FUNCTIONS

      regUser = require('../middleware/registerUser'),

      findUser = require('../middleware/findUser'),

      loginUserVal = require('../middleware/loginValidate'),

      verifyToken = require('../middleware/verifyToken'); 
      

//GET REQUESTS

router.get('/', (req, res) => {

    res.json({
        all_users: `http://localhost:${serverPort}/user/all`,
        your_info: `http://localhost:${serverPort}/user/me`,
    })
})

router.get('/all', async (req, res) => {

    let allUsers = await userSchema.find();

    allUsers.forEach( doc => {
        delete doc._id
    })

    res.json({
        all_users: allUsers
    })
})

//get a user's own info if logged in already
router.get('/me', verifyToken, findUser, (req, res) => {

    let user = req.userFound[0]
    //removing properties a user does not need to know
    delete user._id
    delete user.__v

    res.status(200).json({
        message: 'User Found',
        user: user
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

//LOGGIN IN A USER (creates JWT)
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

    //create a JWT for this time the user logged in.
    newToken = jwt.sign({
        _id: loginUser.id, //when user needs to access db once the jwt is verified the id can be used
        name: loginUser.name //front end can display the users name without requesting db again
    }, jwtKey, {expiresIn: '1h'} ) //user can stay logged in for an hour

    res.status(200).json({
        token: newToken, //this will be stored either in a cookie or in session-storage on the client side
        message: 'successful login'
    })
    
})

//PATCH A USER'S INFO
router.patch('/', verifyToken, async (req, res) => {

    try {

        const id = req.user._id;

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
router.delete('/', verifyToken, findUser, async (req, res) => {

    try {

        let user = req.userFound[0];

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

module.exports = router;