const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

const findMovie = require('../middleware/findMovie');

router.get('/', (req, res) => {
    res.send('asdf')
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

router.delete()

//Movie.findByIdAndDelete(<doc id>)

//request patch

router.patch()

// Movie.update({_id: id}, req.body)

//request movie by DB id
router.get('/movie/:movieId', findMovie, (req, res) => {
    
    res.status(200).json({
        status: 200,
        message: 'A movie was found',
        movie: req.foundMovie,

    })

})

router.post('/', async (req, res) => {

    try {

        const newMovie = await new Movie(req.body);

        await newMovie.save()

        res.status(201).json({
            status: 201,
            new_movie: newMovie,
            message: 'new movie added to the database'
        })

    } catch ( err ) {
        
        // console.log(err.message);

        res.status(500).json({
            message: 'An Error Occured Durring Post Request',
            error: err.message,
            status: 500
        })

    }

})


module.exports = router;
