const express = require('express');

      router = express(),

      serverPort = require('../app').port; 

router.get('/', (req, res) => {

    res.json({
        crypto: `http://localhost:${serverPort}/crypto`,
        user: `http://localhost:${serverPort}/user`
    })
})

module.exports = router;