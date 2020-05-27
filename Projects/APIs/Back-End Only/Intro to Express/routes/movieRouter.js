//Things routers/router files need

    // require express (const express = require('express'))
    // require fs(if working with local database)
    // requires an instance of the express.Router object

    // export the router var

//Things app.js needs that a router does NOT...

    // require an instance of the express obj
    // does not need to specify server port/ip app.listen()

const express = require('express');

const fs = require('fs');

const dbRead = require('../middleware/readDB');

const router = express.Router();

router.get('/', dbRead, (req, res) => {
    //send json with all the movie docs
    console.log(req.dbData);

    res.json({
        status: 200,
        all_movies: req.dbData.movies
    })
    
})


router.get('/', dbRead, (req, res) => {
    //send json with all the movie docs
    console.log(req.dbData);

    res.json({
        status: 200,
        all_movies: req.dbData.movies
    })
    
})

router.get('/:id', dbRead, validateReq, (req, res) => {

    return res.json({
        status: 200,
        movie: req.found
    })

})

//post a new movie

//update movie

//delete a movie

router.delete('/:id', dbRead, validateReq, (req, res) => {

    let databaseData = req.dbData;

    databaseData.movies.splice(req.params.id-1, 1);

    databaseData = JSON.stringify(databaseData);

    let textFile = process.cwd() + '/database/database.txt';

    fs.writeFileSync(textFile, databaseData);

    res.status(200).json({
        status: 200,
        delete_movie: req.found
    })

})

function validateReq(req, res, next) {
    
    if (!req.dbData.movies) {
        return res.status(500).json({
            status: 500,
            message: 'server can not access movies in database'
        })
    }

    const moviesCollection = req.dbData.movies;

    const movieId = parseInt(req.params.id);

    if (isNaN(movieId)) {
        
        return res.status(404).json({
            status: 404,
            message: 'Not a vaild Id, must be a number'
        })
    } else if (movieId <= 0 || movieId > moviesCollection.length-1) {

        return res.status(404).json({
            status: 404,
            message: 'movie selected is not in the valid range'
        })

    }
    
    req.found = moviesCollection[movieId-1] ;

    next()
}


module.exports = router;
