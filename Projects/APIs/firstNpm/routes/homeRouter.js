const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('You Are On The Homepage')
})

module.exports = router;