const User = require("../models/User");
const Movie = require("../models/Movie");

const secret = process.env.JWT_SECRET;

const router = require("express").Router();
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validateUser = require('../middleware/validateUser');
const loginUser = require('../middleware/loginUser');
const userAuth = require('../middleware/userAuth');
const adminAuth = require('../middleware/adminAuth');

const newError = require('../utils/newError'); 

//movie renting 
router.patch(
    '/rent',
    userAuth,
    async (req, res) => {
        
        const movieId = req.body.movieId;

        try {

            const movie = await Movie.findOne({_id: movieId, 'inventory.available': { $gte: 1 } });

            // console.log(`\nFound Movie: ${movie}\n`);

            if (movie === null) {
                console.log(`Movie Id caused error renting ${movieId}`);
                throw newError('Movie Not Found or Movie Unavailable', 404);
            }
            
            //check if the user is already renting
            if (req.user.rentedMovies.indexOf(movieId) != -1) {
                console.log(`User tried rented movie twice\n movieId: ${movieId}\nUserId: ${req.user._id}`);
                throw newError('Movie Not Found or Movie Unavailable', 409);
            }

            //modify the user doc
            const newUser = await User.findByIdAndUpdate(
                req.user._id,
                { $addToSet: { rentedMovies: movieId} },
                {new: 1}
            )

            //modifying the movie doc
            const newMovie = await Movie.findByIdAndUpdate(
                movieId,
                {
                    $addToSet: { 'inventory.rented': req.user._id },
                    $inc: { 'inventory.available': -1 },
                },
                {new: 1}
            )

            res.json({
                message: "successs",
                user: newUser,
                movie: newMovie
            })
            
        } catch (err) {
            const errMsg = err.message || err;
            const errCode = err.code || 500;

            console.log(`Error in movie renting: ${errMsg}`);
            
            res.status(errCode).json({
                error: errMsg
            })
        }

    }
)

//movie return route
//movie renting 
router.patch(
    '/return',
    userAuth,
    async (req, res) => {
        
        const movieId = req.body.movieId;

        try {

            const movie = await Movie.findOne({_id: movieId});

            // console.log(`\nFound Movie: ${movie}\n`);

            if (movie === null) {
                console.log(`Movie Id caused error renting ${movieId}`);
                throw newError('Movie Not Found or Movie Unavailable', 404);
            }
            
            //check if the user is renting
            if (req.user.rentedMovies.indexOf(movieId) === -1) {
                console.log(`User does not have movie and is trying to return\n movieId: ${movieId}\nUserId: ${req.user._id}`);
                throw newError('Movie Not Found In User\'s Rented Movies', 409);
            }

            //modify the user doc
            const newUser = await User.findByIdAndUpdate(
                req.user._id,
                { $pull: { rentedMovies: movieId} },
                {new: 1}
            )

            //modifying the movie doc
            const newMovie = await Movie.findByIdAndUpdate(
                movieId,
                {
                    $pull: { 'inventory.rented': req.user._id },
                    $inc: { 'inventory.available': 1 },
                },
                {new: 1}
            )

            res.json({
                message: "successs",
                user: newUser,
                movie: newMovie
            })
            
        } catch (err) {
            const errMsg = err.message || err;
            const errCode = err.code || 500;

            console.log(`Error in movie renting: ${errMsg}`);
            
            res.status(errCode).json({
                error: errMsg
            })
        }

    }
)


//POST route for Users
//localhost:4000/user
//@desc post/make a new user and store in users collection
//@path (server path)/user/
//@access public
router.post(
    "/", 
    validateUser,
    async (req, res) => {

        //not allow a user to bypass admin level and isAdmin

        //encrypt password for safe DB storage
        // const salt = await bcrypt.genSalt(7);

        // const hashedPass = await bcrypt.hash(req.body.password, salt);        

        // req.body.password = hashedPass;

        req.body.password = await bcrypt.hash(req.body.password, 7);
        
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

//PUT (login) route for Users
//localhost:4000/user
//@desc put/login a new user and store in users collection
//@path (server path)/user/
//@access public
router.put(
    "/", 
    loginUser,
    async (req, res) => {
        
        const token = jwt.sign({id: req.id}, secret, {expiresIn: '3hr'});

        res.json({token});
       
    }
)





//TESTING ROUTES
// router.get(
//     '/testAuth',
//     userAuth,
//     (req, res) => {
//         res.send('success you are logged in')
//     } 
// )

router.get(
    '/testAdminAuth',
    adminAuth,
    (req,res )=> {
        res.send('admin passed test')
    }
)

module.exports = router;