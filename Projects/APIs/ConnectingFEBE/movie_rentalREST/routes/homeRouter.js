const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const adminAuth = require('../middleware/adminAuth');

router.get('/', (req, res) => {
    //expected query properties: 'msg' and 'title'
    const { msg, title} = req.query;

    res.render('test', 
    {
        message: msg || 'Default Message', 
        titleVar: title || 'Default Title'
    });
})

router.get('/mrental', async (req, res) => {
    
    const allMovies = await Movie.find({}),

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
