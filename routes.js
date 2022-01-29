const express = require('express')
const fs = require('fs').promises
const router = express.Router()


module.exports = router

// Our routes go here
router.get('/', (req, res) => {
    fs.readFile('data.json', 'utf-8')
      .then((pup) => {
        const puppiesJs = JSON.parse(pup)  // parse the data into a JavaScript object
        res.render('home', puppiesJs)
        return null
      })
      .catch(err => {
        console.error('ops something happend ', err)
      })
  })

// Create a GET route in your routes.js to render a particular puppy. 
// The route should contain the id as a parameter 
// so you can access it via req.params.id (so perhaps /:id)
// Route for individual puppy page (detail page): - Step 4

router.get('/puppies/:id', (req, res) => {  // router.get('/:id',  NOT WORKING)
  const id = Number(req.params.id) - 1
  fs.readFile('./data.json', 'utf8')
    .then((pup) => {
      const puppiesJs = JSON.parse(pup)      // "pup" don't have to be "puppies"
      res.render('details', puppiesJs.puppies[id])    
      return null
    })
    .catch ((err) => {
      console.log(err)   // console.error('ops something happend ', err)
    })
})


// For the GET /puppies/:id/edit route:

// Loop through our JSON file and find the puppy that we want to edit (don't forget that id as a parameter)
// Render the form using the edit view and the puppy data that we want to edit



router.get('/puppies/:id/edit', (req, res) => {
  const id = Number(req.params.id)
  fs.readFile('data.json', 'utf-8')
      .then(pup => {
          return JSON.parse(pup)
      })
      .then(parsedData => {
          const foundObj = parsedData.puppies.find(obj => obj.id == id)
          return res.render('edit', foundObj)
      })
      .catch(err => {
          console.error(err.message)
      })
})


// For the POST /puppies/:id/edit route:
// Create an object of the updated puppy data from the request body
// Read in the JSON file and locate the puppy we are going to update
// Update the puppy in the array
// Write the entire array back into the JSON file
// Redirect to the GET /puppies/:id route


router.post('/puppies/:id/edit', (req, res) => {
  const id = Number(req.params.id)

  fs.readFile('data.json', 'utf-8')
      .then(pup => {
          return JSON.parse(pup)
      })
      .then(parsedData => {

          const newdata = JSON.parse(JSON.stringify(req.body, null, 2))
          newdata.id = id

          const filteredData = parsedData.puppies.filter(obj => obj.id !== id)

          const newPuppies = [
              ...filteredData,
              { ...newdata }
          ]
          parsedData.puppies = newPuppies
          parsedData.puppies.sort((a, b) => (a.id > b.id ? 1 : -1))
          return parsedData
      })
      .then((parsedData) => {
          fs.writeFile('data.json', JSON.stringify(parsedData, null, 2), 'utf8')
          return res.redirect(`/puppies/${id}`)
      })
      .catch((err) => {
          console.error(err);
      })

})