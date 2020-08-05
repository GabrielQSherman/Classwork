const { Router } = require('express');

const  router = new Router();

const  userPost = require('./userPost.js') 

router.use('/post', userPost)

//@path LH user/login
//@desc login a user
//@access private 
router.patch('login', (req, res) => {
    console.log(req.body);

    try {

        res.json({message: 'success!'})
            
    } catch (error) {

        res.status(500).json({
            message: error.message
        })
        
    }
})



//make viewable to other files
module.exports = router;