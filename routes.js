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
  const id = Number(req.params.id) - 1
  fs.readFile('./data.json', 'utf-8')
    .then(function (result) {
      const parsedPups = JSON.parse(result)     
      const template = 'details'
      const viewData = {
        puppies: parsedPups.puppies[id]
      }
      res.render(template, parsedPups.puppies[id])

      console.log(parsedPups.puppies[id])
      return null
    })
    .catch(function (error) {
      console.log(error)
    })
})
