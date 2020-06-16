const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    const fileLoc = process.cwd() + '\\public\\homeStatic\\home.html';

    res.sendFile(fileLoc)
    
})

module.exports = router;
