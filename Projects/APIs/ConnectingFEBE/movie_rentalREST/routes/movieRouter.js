const express = require('express');
const router = express.Router();
//MongoDB collection is accessible through this variable 
const Movie = require('../models/Movie');
const findMovie = require('../middleware/findMovie');
const adminAuth = require('../middleware/adminAuth');


router.get('/adminTest', adminAuth, async (req, res) => {
    try {
        
        res.json({message: 'YOURE AN ADMIN.', admin_info: req.admin})

    } catch (err) {
        const errMsg = err.message || err;
        
        console.log(`Error In Movie Router Test,\n Error: ${errMsg}`);

        res.status(500).json({error: errMsg })
    }
})




//request all movies in collection/db
router.get('/all', async (req, res) => {
    try {
        const allMovies = await Movie.find(),
            Json = allMovies.length == 0 ? 
            {
                status:200,
                message: 'No movies currently in the DB'
            } 
            : 
            {
                status: 200,
                message: 'All movies were found',
                movies: allMovies
            };
        res.status(200).json(Json);
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: `An error occured`,
            error: err.message,  
        })
    }
})
//request for delete request
router.delete(
    
    '/delete/:movieId', 
    
    findMovie,
    adminAuth, 
    
    async (req, res) => {

    try {
        await Movie.findByIdAndDelete(req.params.movieId);
        res.status(200).json({
            status: 200,
            deleted_movie: req.foundMovie
        })
    } catch (err) {
        console.log('Error in HomeRouter: ' + err.message);
        res.status(500).json({
            status: 500,
            message: err.message
        })   
    }
})
//request patch
router.patch('/patch/:movieId', findMovie, async (req, res) => {
    const id = req.params.movieId;
    const newVersion = req.foundMovie.__v + 1;
    req.body.__v = newVersion;
    try {
        await Movie.update({_id: id}, req.body);
        const updateDocument = await Movie.findById(id); 
        res.status(200).json({
            status: 200,
            new_document: updateDocument,
            old_document: req.foundMovie
        })
    } catch (err) {
        console.log('Error in HomeRouter: ' + err.message);
        res.status(500).json({
            status: 500,
            message: err.message
        })   
    }
})
//request movie by DB id
router.get('/:movieId', findMovie, (req, res) => {  
    res.status(200).json({
        status: 200,
        message: 'A movie was found',
        movie: req.foundMovie,
    })
})
//create a new movie document in DB
router.post('/post', async (req, res) => {

    try {

        const newMovie = await Movie.create(req.body);

        res.status(201).json({
            status: 201,
            new_movie: newMovie,
            message: 'New Movie document added to the database\'s'
        })

    } catch ( err ) {
        
        console.log(err.message);

        res.status(500).json({
            message: 'An Error Occured Durring Movie Post Request',
            error: err.message,
            status: 500
        })
    }
})


//patch movies
router.patch('/patchmovies', async (req, res) => {
    Movie.update(
        {},
        {$set: {inventory: {
            available: 1,
            rented: []
        }}}
    )
})

module.exports = router;