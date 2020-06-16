const userSchema = require('../models/User');

 async function findUser(req, res, next) {

    try {

        const id = req.user._id;

        req.userFound = await userSchema.find({_id: id});

        if (req.userFound.length == 1) {
            
            next()

        } else {
            res.status(404).json({
                message: 'No user found'
            })
        }

        
    } catch (err) {
        res.status(500).json({
            message: `Error Occured: ${err.message}`,
            full_error_report: err
        })
    } 
}

module.exports = findUser