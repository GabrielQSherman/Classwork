const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET

module.exports = async (req, res, next) => {
    try {
        req.token = jwt.sign({id: req.id}, secret, {expiresIn: '3hr'});
        next()
    } catch (err) {
        res.status(500).json({
            message: err.message || err
        })
    }
}