const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    const fileLoc = process.cwd() + '\\public\\home.html';

    res.sendFile(fileLoc)
    
})

module.exports = router;
