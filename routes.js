const fs = require('fs/promises')
const express = require('express')

const router = express()

module.exports = router

// Get main puppy page
router.get('/', (req, res) => {
    fs.readFile('./data.json', 'utf-8')
    .then(function (result) {
      const parsedPups = JSON.parse(result)      
      const template = 'home'
      const viewData = {
        puppies: parsedPups.puppies
      }
      res.render(template, viewData)
      return null
    })
    .catch(function (error) {
      console.log(error)
    })
})

// Get individual puppy page
router.get('/puppies/:id', (req, res) => {
  const index = Number(req.params.id) - 1
  fs.readFile('./data.json', 'utf-8')
    .then(function (result) {
      const parsedPups = JSON.parse(result)     
      const template = 'details'
      const viewData = {
        puppies: parsedPups.puppies[index]
      }
      res.render(template, parsedPups.puppies[index])

      console.log(parsedPups.puppies[index])
      return null
    })
    .catch(function (error) {
      console.log(error)
    })
})

// GET edit Puppy Page
router.get('/puppies/:id/edit', (req, res) => {
  const index = Number(req.params.id) - 1
  fs.readFile('./data.json', 'utf-8')
    .then(function (result) {
      const parsedPups = JSON.parse(result)     
      const template = 'edit'
      //console.log()
      res.render(template, parsedPups.puppies[index])

     // console.log(parsedPups.puppies[id])
      return null
    })
    .catch(function (error) {
      console.log(error)
  })
})

// POST Puppy edits
router.post('/puppies/:id/edit', (req, res) => {
  // Get the index from the URL
  const id = Number(req.params.id)
  
  // New Object for puppy update
  const updatePup = {
    id: id,
    name: req.body.name,
    owner: req.body.owner,
    image: req.body.image,
    breed: req.body.breed
  }

  // Read in the JSON File
  fs.readFile('./data.json', 'utf-8')
    .then(function (result) {
      const parsedPups = JSON.parse(result)

      let updatedPups = parsedPups.puppies.map(pup => {
        if (pup.id === id) {

          pup = updatePup
        }

        return pup
      })

      parsedPups.puppies = updatedPups
      pups = JSON.stringify(parsedPups)

      fs.writeFile('./data.json', pups, 'utf-8')
        .then(() => { return res.redirect(`/puppies/${id}`) })
        .catch(err => {
          console.error(err.message)
        })
    })
       
 
    
    

  // Update the selected puppy in the array


  // Write the update puppy back to the JSON file

  // Redirect to the GET /puppies/:id route
  
 
}) 
