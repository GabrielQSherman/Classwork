
const router = require('express').Router();

router.get('/today', (req, res) => {
  res.send(new Date().toISOString().substring(0,10))
});

module.exports = router;