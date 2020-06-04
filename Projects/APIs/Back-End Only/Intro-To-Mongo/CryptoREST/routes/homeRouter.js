const express = require('express');

      router = express();

router.get('/', (req, res) => {
    res.json({
        crypto: 'http://localhost:7777/crypto',
        user: 'http://localhost:7777/user'
    })
})

module.exports = router;