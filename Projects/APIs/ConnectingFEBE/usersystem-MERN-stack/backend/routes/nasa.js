
const router = require('express').Router()
const {default: axios} = require('axios')

const nasaEndpoint = 'https://api.nasa.gov/planetary/apod'

const nasaKey = process.env.NASA_API_KEY;

//@path: POST /nasa/bydate
//@access: public
//@desc: get a nasa apod post by a given date
router.post("/bydate", async (req, res) => {

  try {

    console.log(req.body);

    res.json(req.body)
    
  } catch (error) {
    console.log(error);
    res.status(500).json({message: error.message || "An Unknown Error Occured" })
  }
})


module.exports = router;