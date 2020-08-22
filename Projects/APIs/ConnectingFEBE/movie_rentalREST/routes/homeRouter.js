const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const adminAuth = require('../middleware/adminAuth');
const extractToken = require('../middleware/extractToken');
const isAdmin = require('../middleware/isAdmin');
const User = require('../models/User');

router.get('/login', (req, res) => {

    res.render('login')

})

router.get('/register', (req, res) => {

    res.render('register')

})

router.get('/', 
    extractToken,
    isAdmin,
    async (req, res) => {

        const loggedIn = req.authKey != undefined;
        
        const allMovies = await Movie.find({ 'inventory.available': {$gte: 1}});

        const isAdmin = req.isAdmin || false ;

        const renderOption = {
            all_movies: allMovies, 
            isLoggedIn: loggedIn,
            isAdmin: isAdmin 
        }

        res.render('home', renderOption )
    
})

router.get(
    '/admin', 
    extractToken,
    adminAuth, 
    (req, res) => {
    res.render('admin-movie')
})

//needs work
router.get('/mrental/static', (req, res) => {

    console.log('trying to connect...');
    
    const fileLoc = process.cwd() + '\\public\\home-static.html';

    res.sendFile(fileLoc)
})

router.get(
    '/profile/:username', 
    extractToken,
    isAdmin,
    async (req, res) => {

        const profileOwner = await User.findOne({username: req.params.username})

        if (profileOwner === null) return res.redirect('/');

        const viewingUser = await User.findById(req.userId)

        const renderOption = {
            proUsername: profileOwner.username,
            rented: profileOwner.rentedMovies
        }
        
        res.render('profile', renderOption);
    }
)


module.exports = router;
