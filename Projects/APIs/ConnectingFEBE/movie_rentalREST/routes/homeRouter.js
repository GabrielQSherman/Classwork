const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const adminAuth = require('../middleware/adminAuth');

router.get('/login', (req, res) => {

    res.render('login')

})

router.get('/', async (req, res) => {
    
    const allMovies = await Movie.find({ 'inventory.available': {$gte: 1}}),

          clientMsg = 'Number of Movies: ' + allMovies.length;

    res.render('home', {all_movies: allMovies, message: clientMsg})
    
})

router.get('/mrental/admin/:key', adminAuth, (req, res) => {
    res.render('admin-movie')
})

//needs work
router.get('/mrental/static', (req, res) => {

    console.log('trying to connect...');
    
    const fileLoc = process.cwd() + '\\public\\home-static.html';

    res.sendFile(fileLoc)
})


module.exports = router;
