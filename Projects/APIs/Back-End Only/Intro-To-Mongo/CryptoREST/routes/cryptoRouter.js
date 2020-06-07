//IMPORTING...
const 
      //PACKAGES
      express = require('express');

      router = express(),

      //MIDDLEWARE
      verify = require('../middleware/verifyToken'),

      findUser = require('../middleware/findUser');

//Show all crypto prices 
router.get('/', verify, findUser, (req, res) => {

      const cryptos = req.userFound.cryptos;
      
      if (!cryptos) {
           res.status(404).json({message:'you have not favorite cryptos'}) 
      }

      res.json({
            message: 'You Favorite Cryptocurrencies',

            cryptos: {
                  bitcoin: 9779,
                  rank: 1
            }
      })

})

module.exports = router;