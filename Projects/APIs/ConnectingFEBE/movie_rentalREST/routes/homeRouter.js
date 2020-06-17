const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

router.get('/', (req, res) => {

    res.render('test', {message: "Test Message", titleVar: 'Title Here!'})

})

router.get('/mrental', async (req, res) => {
    
    const allMovies = await Movie.find({}),

          clientMsg = 'Number of Movies: ' + allMovies.length;

    res.render('home', {all_movies: allMovies, message: clientMsg})
    
})

//needs work
router.get('/mrental/static', (req, res) => {

    console.log('trying to connect...');
    
    const fileLoc = process.cwd() + '\\public\\home-static.html';

    res.sendFile(fileLoc)
})


module.exports = router;
