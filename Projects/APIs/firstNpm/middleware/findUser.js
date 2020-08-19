const User = require('../models/User');

const findUser = async ( req, res, next) => {

    const userId = req.params.id;

    try {

        if (typeof userId != 'string' ||  userId.length !== 24) {
            console.error('An Invalid Id Was Given');
            return res.status(400).json({
                message: 'Invalid Id Given'
            })
        }
        
        const user = await User.findById(userId);

        if (user === null) {
            console.error('No User Was Found');
            return res.status(404).json({
                message: 'No User Found'
            })
        }

        req.userId = userId;

        next()

        
    } catch (err) {
        const msg = err.message || err;
        console.error(msg);
        res.status(500).json({
            message: msg
        })          
    }

}

module.exports = findUser;