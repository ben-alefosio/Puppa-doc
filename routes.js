const express = require('express')
const router = express.Router()

module.exports = router

router.get('/hi', (req, res) => {
  res.send('welcome!')
})
