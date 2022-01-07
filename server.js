const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const fsPromises = require('fs').promises

const server = express()

const filepath = path.join(__dirname, 'data.json')

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here

// Home Page
server.get('/', (req, res) => {
  fsPromises.readFile(filepath, 'utf8')
    .then((puppies) => {
      const viewData = JSON.parse(puppies)
      res.render('home', viewData)
      return null
    })
    .catch((err) => {
      console.log(err.message)
    })
})

// Profile Page
server.get('/puppies/:id', (req, res) => {
  fsPromises.readFile(filepath, 'utf8')
    .then((puppies) => {
      const parsedPuppies = JSON.parse(puppies)
      const index = parseInt(req.params.id)
      const viewData = (parsedPuppies.puppies).find(puppy => puppy.id === index)
      res.render('details', viewData)
      return null
    })
    .catch((err) => {
      console.log(err.message)
    })
})

// Edit Page
server.get('/puppies/:id/edit', (req, res) => {
  fsPromises.readFile(filepath, 'utf8')
    .then((puppies) => {
      const parsedPuppies = JSON.parse(puppies)
      const index = parseInt(req.params.id)
      const viewData = (parsedPuppies.puppies).find(puppy => puppy.id === index)
      res.render('edit', viewData)
      return null
    })
    .catch((err) => {
      console.log(err.message)
    })
})

// Post route for edit form
server.post('/puppies/:id/edit', (req, res) => {
  fsPromises.readFile(filepath, 'utf8')
    .then((puppies) => {
      const parsedPuppies = JSON.parse(puppies)

      const editedPuppies = {
        ...parsedPuppies
      }

      editedPuppies.puppies.find(obj => obj.image === req.body.image).name = req.body.name
      editedPuppies.puppies.find(obj => obj.image === req.body.image).owner = req.body.owner
      editedPuppies.puppies.find(obj => obj.image === req.body.image).breed = req.body.breed

      const stringifiedPuppies = JSON.stringify(editedPuppies, null, 2)

      fsPromises.writeFile(filepath, stringifiedPuppies, 'utf8')
        .then(() => {
          console.log('Edit success!')
          return null
        })
        .catch((err) => {
          console.log(err.message)
        })

      res.redirect(`/puppies/${req.body.id}`)
      return null
    })
    .catch((err) => {
      console.log(err.message)
    })
})

module.exports = server
