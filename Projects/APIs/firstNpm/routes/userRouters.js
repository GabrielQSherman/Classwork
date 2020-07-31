const { Router } = require('express');

const  router = new Router();

const  userPost = require('./userPost.js') 

router.use('/post', userPost)

/*
@path   localhost:port/user/now/:day/:month
@desc   returns to the client a page with todays current date,
        the date can be changed using request parameters
@access private
*/
router.get('/now', (req, res) => {
    
    const { 
        year: y=null,
        day: d=null,
        hour: h=null, 
        month: m=null, 
        seconds: sec=null,
        minutes: min=null,
        ms=null
    } = req.body;

    const date = new Date(y, m, d, h, sec, min, ms)

    res.send(date)

})

//create a route handler


//make viewable to other files
module.exports = router;