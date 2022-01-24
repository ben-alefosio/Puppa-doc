const express = require('express')
const router = express.Router()

const fs = require('fs').promises
const path = require('path')

const puppiesData = path.join(__dirname, 'data.json')

module.exports = router

// get router

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  fs.readFile(puppiesData, 'utf-8')
    .then((data) => {
    // turned JSON file as regular data
      const puppiesObj = JSON.parse(data)
      // find the puppy that matches the id
      const findPuppy = puppiesObj.puppies.find(puppy => puppy.id === id)

      res.render('details', findPuppy)
      return null
    })
    .catch(err => {
      console.error('opps something happend ', err)
    })
})

router.get('/:id/edit', (req, res) => {
  const id = Number(req.params.id)
  fs.readFile(puppiesData, 'utf-8')
    .then((data) => {
      // turned JSON file as regular data
      const puppiesObj = JSON.parse(data)
      // find the puppy that matches the id
      const findPuppy = puppiesObj.puppies.find(puppy => puppy.id === id)

      res.render('edit', findPuppy)
      return null
    })
    .catch(err => {
      console.error('opps something happend ', err)
    })
})

router.post('/:id/edit', (req, res) => {

}

)
