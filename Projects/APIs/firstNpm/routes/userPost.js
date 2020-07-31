const { Router } = require('express');

const router = Router();

router.post('/newUser', async (req, res) => {
    //do this thing
    try {

        console.log(body);

        res.json({message: 'success!'})
            
    } catch (error) {

        res.status(500).json({
            message: error.message
        })
        
    }
    //do a thing after
})

module.exports = router;