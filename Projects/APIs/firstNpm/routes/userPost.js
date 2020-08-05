const { Router } = require('express');

const router = Router();


//@ path: LH/user/post/new
//@ desp: make a new user document and stores their info to the database
//@ access: public
router.post('/new', async (req, res) => {
    //do this thing
    console.log(req.body);

    try {

        res.json({message: 'success!'})
            
    } catch (error) {

        res.status(500).json({
            message: error.message
        })
        
    }
    //do a thing after
})

module.exports = router;