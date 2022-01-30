const express = require('express')

const fs = require('fs').promises

// const { router } = require('./server')???

const path = require('path')
const router = express.Router()
module.exports = router
const puppyData = path.join(__dirname, 'data.json')

// NOT '/puppies'
router.get('/:id', (req, res) => {
  fs.readFile(puppyData, 'utf-8')
    .then((insideData) => {
      const obj = JSON.parse(insideData)
      const viewData = obj.puppies.find(puppy => puppy.id === Number(req.params.id))
      // console.log(Number(req.params.id))
      res.render('details', viewData)
      return null
    })
    .catch((err) => {
      console.log(err, '!!ERROR!!')
    })
})

// Loop through our JSON file and find the puppy that we want to edit (don't forget that id as a parameter)

// Render the form using the `edit` view and the puppy data that we want to edit

router.get('/:id/edit', (req, res) => {
  fs.readFile(puppyData, 'utf-8')
    .then((insideData) => {
      const obj = JSON.parse(insideData)
      const viewData = obj.puppies.find(puppy => puppy.id === Number(req.params.id))
      res.render('edit', viewData)
      return null
    })
    .catch((err) => {
      console.log(err, '!!ERROR!!')
    })
})

router.post('/:id/edit', (req, res) => {
  const urlId = parseInt(req.params.id)

  // Create an object of the updated puppy data from the request body
  const updatedPuppyData = req.body
  updatedPuppyData.id = Number(updatedPuppyData.id)
  console.log('updated puppy data', updatedPuppyData)

  // Read in the JSON file and locate the puppy we are going to update
  fs.readFile(puppyData, 'utf-8')
    .then((data) => {
      const puppiesArray = JSON.parse(data)

      // Update the puppy in the array
      const index = puppiesArray.puppies.findIndex(pup => pup.id === Number(updatedPuppyData.id))

      const start = puppiesArray.puppies.slice(0, index)
      const end = puppiesArray.puppies.slice(index + 1)
      const newArray = [...start, updatedPuppyData, ...end]

      // Adding updated data into puppies object
      const puppies = { puppies: newArray }

      // Write the entire array back into the JSON file
      const endPuppy = JSON.stringify(puppies, null, 2)
      console.log('end puppy', endPuppy)

      return fs.writeFile(puppyData, endPuppy, 'utf-8')

      // Redirect to the GET `/puppies/:id` route
    })
    .then(res.redirect(`/puppies/${urlId}`))
    .catch((err) => {
      console.error(err, '!!ERROR!!')
    })
})

// NOTES

// request.params is an object containing properties to the named route

// The slice() method returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array. The original array will not be modified.

// slice()
// slice(start)
// slice(start, end)
