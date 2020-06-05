const express = require('express');

      router = express();

//Show all crypto prices 
router.get('/', (req, res) => {

      res.json({
            message: 'Top Ten Crypto-Blockchain Technologies',

            cryptos: {
                  bitcoin: 9779,
                  rank: 1
            }
      })

})

module.exports = router;