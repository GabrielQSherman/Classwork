const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

module.exports = ( req, res, next ) => {
    try {

        req.createdJWT = jwt.sign( {id: req.userId}, jwtSecret, {expiresIn: '3h'} )

        next()

    } catch (err) {
        console.error(err.message || err);
        res.status(500).json({
            message: err.message,
            error: err
        })
    }
}