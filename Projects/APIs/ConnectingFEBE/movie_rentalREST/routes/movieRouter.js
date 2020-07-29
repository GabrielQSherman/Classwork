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
const extractToken = require('../middleware/extractToken');
//utilies
const newError = require('../utils/newError');

//Routes to make
router.patch(
    '/updateinv',
    extractToken,
    adminAuth, 
    async (req, res) => {

        const { movieId, inc, isIncrease = true } = req.body;

        const adminLevel = req.admin.adminProp.adminLevel;

        try {

            //movieId validation
            if ( typeof movieId !== 'string' || movieId.length !== 24 ) throw newError('The Movie\'s Id Is Invalid', 400);

            if (typeof inc !== 'number' || inc <= 0) throw newError('Increment Value Invalid', 400);

            let limit;

            switch (adminLevel) {
                case 1:
                    limit=1
                    break;
                case 2:
                    limit=10
                    break;           
                case 3:
                    limit=100
                    break;
            }

            if (inc > limit) {
                throw newError( `Not Authorized To Increase By ${inc}, With Your Admin Level Of ${adminLevel}`, 401 );
            } 

            const increment = isIncrease ? inc : -inc;

            const found = await Movie.findById(movieId);

            if (found === null) throw newError('Movie with that id does not exist', 404);

            if (found.inventory.available + increment < 0) throw newError('Negitive numbers are not allowed in movies inventory', 400);

            const updatedMovie = await Movie.findOneAndUpdate( 
                {_id: movieId }, 
                {$inc: {'inventory.available': increment}}, 
                {new: 1}
            )

            res.json({
                message: "Successful Inventory Update",
                movie: updatedMovie
            })


            
        } catch (err) {

            const { message:msg = err, code = 500 } = err;

            res.status(code).json({
                error: msg
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
    extractToken,
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
router.patch(
    '/patch/:movieId', 
    findMovie, 
    async (req, res) => {
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
router.get(
    '/getmovie/:movieId', 
    findMovie, 
    (req, res) => {  
    res.status(200).json({
        status: 200,
        message: 'A movie was found',
        movie: req.foundMovie,
    })
})
//create a new movie document in DB
router.post(
    '/post', 
    extractToken,
    adminAuth,
    async (req, res) => {

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
// router.patch(
//     '/moviepatch1',
//     adminAuth,
//     async (req, res) => {

//         try {

//             const report = await Movie.updateMany( 
//                 {}, 
//                 {
//                     inventory: {
//                         available: 1,
//                         rented: []
//                     }
//                 }
            
//             )
//             res.json({
//                 allDoc: await Movie.find({}),
//                 report: report,
//                 message: 'successfull patch'})

//         } catch (err) {
//             res.status(500).json({error: err.message || err})
//         }

//     }
// )

module.exports = router;