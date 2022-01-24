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
    })
})

// Create an object of the updated puppy data from the request body
// Read in the JSON file and locate the puppy we are going to update
// Update the puppy in the array
// Write the entire array back into the JSON file
// Redirect to the GET `/puppies/:id` route

router.post('/:id/edit', (req, res) => {

})

// NOTES
// request.params is an object containing properties to the named route
