const express = require('express');

      router = express();

router.get('/', (req, res) => {
    res.send('crypto page')
})

module.exports = router;