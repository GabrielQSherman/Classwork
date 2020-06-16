const 
      //PACKAGES
      express = require('express');

      router = express.Router(),
      
      //IMPORTED VARS & FUNCTIONS
      serverPort = require('../app').port,

      cKey = require('../app').cryptoKey,

      isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', async (req, res) => {

    //will be an obj if the user has a verified JWT, otherwise false
    const loggedin = await isLoggedIn(req);
    
    if (loggedin) {
    
       const renderObj = {name: loggedin.name, port: serverPort}
        
       res.render('home-prv', renderObj)

    } else {
        res.render('home-pub')
    }
   
})

router.get('/getapikey', async (req, res) => {

    const loggedin = await isLoggedIn(req);

    if (loggedin && cKey != undefined) { //cKey should only be undefined if you do not have a .env file with a CRYPTO_KEY property
        res.status(200).json({
            success: true,
            key: cKey
        })
    } else {
        res.status(401).json({
            success: false,
            message: 'you are not authorized to use the api'
        })
    }

})


module.exports = router;