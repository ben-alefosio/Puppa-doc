const express = require('express')
const { reset } = require('nodemon')
const router = express.Router()
const fs = require('fs')

module.exports = router

router.get('/:id', (req, res) => {
  res.send('This is working!')
})
