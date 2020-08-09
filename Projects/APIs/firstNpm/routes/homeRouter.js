const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {

    const filePath = process.cwd() + '\\public\\home.html';

    console.log(filePath);

    res.sendFile(filePath)
})


router.get(
    '/login',
    (req, res) => {

        const filePath = process.cwd() + '\\public\\login.html';

        res.sendFile(filePath);

    }
)

module.exports = router;