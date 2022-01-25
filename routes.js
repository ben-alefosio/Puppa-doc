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
      // using the edit partial
      res.render('edit', findPuppy)
      return null
    })
    .catch(err => {
      console.error('opps something happend ', err)
    })
})

router.post('/:id/edit', (req, res) => {
  // parseInt returns the first integer
  const id = Number(req.params.id)
  fs.readFile(puppiesData, 'utf-8')
    .then((data) => {
    // turn JSON file as regular file
      const puppiesObj = JSON.parse(data)
      // check to see if there is a puppy in the array that matches the id
      const puppiesArray = puppiesObj.puppies.filter(puppy => JSON.stringify(puppy.id) === req.params.id)
      //   console.log(puppiesArray)
      // checking to see if there is a matching puppy
      const noMatchingPuppy = puppiesObj.puppies.filter(puppy => JSON.stringify(puppy.id) !== req.params.id)

      //   console.log(noMatchingPuppy)

      // creating a new puppy object
      const newPuppy = {
        id: id,
        image: puppiesArray[0].image,
        breed: req.body.breed,
        name: req.body.name,
        owner: req.body.owner
      }

      //   console.log(newPuppy)
      noMatchingPuppy.push(newPuppy)
      const newPuppyData = { puppies: noMatchingPuppy }

      //   console.log(newPuppyData)
      fs.writeFile(puppiesData, JSON.stringify(newPuppyData), 'utf-8')
      return null
        .then(() => {
          return res.redirect(`/puppies/${id}`)
        })
        .catch(err => {
          console.error('opps something happend ', err)
        })
    })
})
