const express = require('express')

const router = express.Router()

const fs = require('fs').promises
const path = require('path')

const puppiesData = path.join(__dirname, 'data.json')

router.get('/puppies/:id', (req, res) => {
  const id = Number(req.params.id)
  fs.readFile(puppiesData, 'utf-8')
    .then((data) => {
      const puppiesObj = JSON.parse(data)
      const selectPuppy = puppiesObj.puppies.find(puppy => puppy.id === id)
      res.render('details', selectPuppy)
      return null
    })
    .catch(err => {
      console.log('Uh oh, something went wrong', err)
    })
})

module.exports = router
