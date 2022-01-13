const fs = require('fs/promises')
const express = require('express')

const router = express()

module.exports = router

router.get('/', (req, res) => {
  //const id = Number(req.params.id) 
  fs.readFile('./data.json', 'utf-8')
    .then(function (result) {
      const parsedPups = JSON.parse(result)
      console.log(`I am here ${parsedPups}`)
      console.log(parsedPups)
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

router.get('/puppies/:id', (req, res) => {
  const id = Number(req.params.id) 
  fs.readFile('./data.json', 'utf-8')
    .then(function (result) {
      const parsedPups = JSON.parse(result)
      console.log(`I am here ${parsedPups}`)
      console.log(parsedPups)
      const template = 'home'
      const viewData = {
        puppies: parsedPups.puppies[id]
      }
      res.render(template, viewData)
      return null
    })
    .catch(function (error) {
      console.log(error)
    })
})
