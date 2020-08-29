const router = require('express').Router();

router.get('/', (req, res) => {

    res.send('trying to get users?')

})

module.exports = router