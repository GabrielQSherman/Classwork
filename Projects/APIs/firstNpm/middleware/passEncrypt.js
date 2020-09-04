
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {

    try {

        const 
        oldPass = req.newUser.password,
        encryptedPass = await bcrypt.hash( oldPass, 13)

        req.newUser.password = encryptedPass; 

        next()

    } catch (err) {
        console.error(err.message || err)
        res.status(500).json({
            message: err.message,
            error: err
        })
    }

}