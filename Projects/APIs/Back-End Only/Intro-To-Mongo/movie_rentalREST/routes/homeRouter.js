const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

router.get('/', (req, res) => {
    res.send('asdf')
})

router.post('/', async (req, res) => {

    try {

        const newMovie = await new Movie(req.body);

        await newMovie.save()

        res.json({
            status: 201,
            new_movie: newMovie,
            message: 'new movie added to the database'
        })

    } catch ( err ) {
        
        console.log(err.message);

        res.json({
            message: 'An Error Occured Durring Post Request',
            error: err.message,
            status: 500
        })

    }

})


module.exports = router;
