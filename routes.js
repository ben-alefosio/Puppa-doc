const express = require('express')
const router = express.Router()

const fs = require('fs').promises
const path = require('path')

// puppiesData takes us to the path and is a string
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
      // putting the data into the browser
      res.render('details', findPuppy)
      return null
    })
    // error messaage
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
      // creating an array with 1 object element that filters the puppy that matched the id in the URL
      const puppiesArray = puppiesObj.puppies.filter(puppy => JSON.stringify(puppy.id) === req.params.id)
      // creating an array with the rest of the remainder puppies
      const noMatchingPuppy = puppiesObj.puppies.filter(puppy => JSON.stringify(puppy.id) !== req.params.id)

      // creating a new puppy object
      // req.body takes information that is put into the form on the browser
      // Because puppiesArray only has 1 element in it, it will always be puppiesArray[0]
      const newPuppy = {
        id: id,
        image: puppiesArray[0].image,
        breed: req.body.breed,
        name: req.body.name,
        owner: req.body.owner
      }

      // pushing the new puppy object with the new information recieved from the form into the array with the remainder of the puppies
      noMatchingPuppy.push(newPuppy)
      const newPuppyData = { puppies: noMatchingPuppy }

      // returning a promise in a promise
      // stringifying the new puppy data into JSON
      return fs.writeFile(puppiesData, JSON.stringify(newPuppyData), 'utf-8')
    })
    // redirecting the back to the puppies id page
    .then(() => {
      return res.redirect(`/puppies/${id}`)
    })
    .catch(err => {
      console.error('opps something happend ', err)
    })
})
