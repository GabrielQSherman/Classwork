const express = require('express');

      router = express();

      let homePgFile = process.cwd() + '/public/homepage.html';

router.get('/', (req, res) => {
    res.sendFile(homePgFile)
})

module.exports = router;