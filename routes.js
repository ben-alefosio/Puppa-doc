const express = require('express')
const fs = require('fs').promises
const router = express.Router()


module.exports = router

// Our routes go here
router.get('/', (req, res) => {
    fs.readFile('data.json', 'utf-8')
      .then((puppies) => {
        const puppiesJs = JSON.parse(puppies)  // parse the data into a JavaScript object
        res.render('home', puppiesJs)
        return null
      })
      .catch(err => {
        console.error('ops something happend ', err)
      })
  })
