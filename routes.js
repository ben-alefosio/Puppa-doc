const express = require('express')
const { reset } = require('nodemon')
const router = express.Router()
const fsPromises = require('fs').promises

module.exports = router

router.get('/:id', (req, res) => {
  // res.send('This is working!' + req.params.id)
  fsPromises.readFile('data.json', 'utf8')
    .then((puppy) => {
      const realPuppyData = JSON.parse(puppy)
      const id = req.params.id
      res.render('details', realPuppyData[id])
      return null
    })
    .catch(err => {
      console.log(err)
    })
})
