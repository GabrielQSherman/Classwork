let express = require('express'),

    router = express.Router();

router.get('/', (req, res) => {
    
    res.sendFile(process.cwd() + '/static/home.html');

});

module.exports = router;