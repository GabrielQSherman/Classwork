const 
      //PACKAGES
      express = require('express');

      router = express(),
      
      //IMPORTED VARS & FUNCTIONS
      serverPort = require('../app').port,

      isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', async (req, res) => {

    let loggedin = await isLoggedIn(req);

    if (loggedin) {
        res.json({
            crypto: `http://localhost:${serverPort}/crypto`,
            user: `http://localhost:${serverPort}/user`
        })

    } else {
        res.render('home')
    }

    
})

module.exports = router;