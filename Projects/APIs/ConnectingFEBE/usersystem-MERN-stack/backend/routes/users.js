const router = require('express').Router()
const sendErr = require('../middlewares/sendGenericError')
const User = require('../models/User')
const { check, validationResult } = require('express-validator')

router.get('/all', async (req, res) => {
  try {
    const allUsers = await User.find()
    res.json({ data: allUsers })
  } catch (err) {
    sendErr(err, res)
  }
})

router.post(
  '/signup', 
  check('email', "Email Is Required").not().isEmpty(),
  check('username', "Username Is Required").not().isEmpty(),
  check('password', "Password Is Required").not().isEmpty(),
  check('email', "Valid Email Required").isEmail(),
  check('password', "Password must be between 6 and 100 characters").isLength({min: 6, max: 100}),
  async (req, res) => {
  const errors = validationResult(req).array()
  if (errors.length != 0) {
    return res.status(400).json({errors })
  }
  try {
    const newUser = await User.create(req.body)
    res.status(201).json(newUser)
  } catch (err) {
    sendErr(err, res)
  }
})

router.put('/login', (req, res) => {
  res.send('token')
})

module.exports = router