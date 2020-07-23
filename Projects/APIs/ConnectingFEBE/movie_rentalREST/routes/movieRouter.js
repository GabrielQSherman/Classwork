//packages
const express = require('express');
//express router intance
const router = express.Router();
//MongoDB collections is accessible through this variable 
const Movie = require('../models/Movie');
const User = require('../models/User');
//middlewares
const findMovie = require('../middleware/findMovie');
const adminAuth = require('../middleware/adminAuth');
//utilies
const newError = require('../utils/newError');

//Routes to make

//add movie inventory
router.patch(
    '/addinven',
    adminAuth, 
    async (req, res) => {
        
        const {movieId , inc} = req.body,

              adminLvl = req.admin.adminLevel;
        try {
            
            if (typeof movieId === 'string' && movieId.length != 24) throw newError('Movie Id is invalid', 404);
            
            if (typeof inc != 'number') throw newError('Invalid Input For Movie Stock Increase', 400) 
            
            if ( 
                ( adminLvl === 1 && ( inc > 1   || inc < 0 ) )
                ||
                ( adminLvl === 2 && ( inc > 10  || inc < 0 ) )
                ||
                ( adminLvl === 3 && ( inc > 100 || inc < 0 ) )
            ) {

                throw newError( `Not Authorized To Increase By ${inc}`, 401 );
                
            } 

            const updatedMovie = await Movie.findByIdAndUpdate(
                movieId, 
                {$inc: {'inventory.available': inc}},
                {new: 1}
            ) 

            res.json({movie: updatedMovie})
            
        } catch (err) {

            const errMsg = err.message || err;
            const errCode = err.code || 500;

            res.status(errCode).json({
                error: errMsg
            })
            
        }

    }
)

//delete movie inventory
router.patch(
    '/addinven',
    adminAuth, 
    async (req, res) => {
        
        const {movieId , inc} = req.body,

              adminLvl = req.admin.adminLevel;
        try {

            if (typeof movieId === 'string' && movieId.length != 24) throw newError('Movie Id is invalid', 404);
            
            if (typeof inc != 'number') throw newError('Invalid Input For Movie Stock Increase', 400) 
            
            if ( 
                ( adminLvl === 1 && ( inc > 1   || inc < 0 ) )
                ||
                ( adminLvl === 2 && ( inc > 10  || inc < 0 ) )
                ||
                ( adminLvl === 3 && ( inc > 100 || inc < 0 ) )
            ) {

                throw newError( `Not Authorized To Increase By ${inc}`, 401 );
                
            } 

            const updatedMovie = await Movie.findByIdAndUpdate(
                movieId, 
                {$inc: {'inventory.available': -inc}},
                {new: 1}
            ) 

            res.json({movie: updatedMovie})
            
        } catch (err) {

            const errMsg = err.message || err;
            const errCode = err.code || 500;

            res.status(errCode).json({
                error: errMsg
            })
            
        }

    }
)
//TODO make movie routes admin/user only include adminAuth/user

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
router.get('/getmovie/:movieId', findMovie, (req, res) => {  
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


//patch all movies to now have an inventory that matches the model
router.patch(
    '/moviepatch1',
    adminAuth,
    async (req, res) => {

        try {

            const report = await Movie.updateMany( 
                {}, 
                {
                    inventory: {
                        available: 1,
                        rented: []
                    }
                }
            
            )
            res.json({
                allDoc: await Movie.find({}),
                report: report,
                message: 'successfull patch'})

        } catch (err) {
            res.status(500).json({error: err.message || err})
        }

    }
)

module.exports = router;