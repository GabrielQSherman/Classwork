const express = require('express');

      router = express();

router.get('/', (req, res) => {
    res.send('cryptopage')
})

module.exports = router;