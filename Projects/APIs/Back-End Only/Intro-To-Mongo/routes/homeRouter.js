const express = require('express');

      router = express();

router.get('/', (req, res) => {
    res.send('homepage')
})

module.exports = router;