//IMPORTING...
const 
      //PACKAGES
      express = require('express');

      router = express.Router(),

      //MIDDLEWARE
      verify = require('../middleware/verifyToken'),

      findUser = require('../middleware/findUser');

//Show all crypto prices 
router.get('/', verify, findUser, (req, res) => {

      const cryptos = req.userFound.cryptos;
      
      if (!cryptos) {
           return res.status(404).json({message:'you have no favorite cryptocurrencies'}) 
      }

      res.status(200).json({
            message: 'You Favorite Cryptocurrencies',

            cryptos: {
                  bitcoin: 9779,
                  rank: 1
            }
      })

})

module.exports = router;