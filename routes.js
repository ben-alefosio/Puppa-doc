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