
const router = require('express').Router()
const {default: axios} = require('axios')

const nasaEndpoint = 'https://api.nasa.gov/planetary/apod'

const nasaKey = process.env.NASA_KEY;

router.get('/today', async (req, res) => {
  try {
    const today = new Date().toISOString().substring(0,10);

    const data = await axios.get(`${nasaEndpoint}?date=${today}&api_key=${nasaKey}`)
  
    res.json(data)
  } catch (err) {
    console.log(err);
    res.status(500).json({error: "server error"})
  }
});

module.exports = router;