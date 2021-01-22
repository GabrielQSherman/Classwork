module.exports = (err, res) => {
  res.status(500).json({message: err.message || err})
}