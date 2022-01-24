const express = require('express')
const hbs = require('express-handlebars')
const fsPromises = require('fs').promises

// Import data
const server = express()
module.exports = server
const routesFile = require('./routes') // import the use of this file

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false })) // sets up file being able to accept encoded data from a form

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here
server.use('/', routesFile) // tells server to use the route

server.get('/puppies', (req, res) => {
  res.send('oops! wrong page! Go back to the main page!')
})

// ------- HOMEPAGE -------
// makes a file path then turns data.json into an object
server.get('/', (req, res) => {
  fsPromises.readFile('data.json', 'utf8')
    .then((data) => {
      const pupData = JSON.parse(data)
      // console.log(pupData)
      res.render('home', pupData)
      return null
    })
    .catch((err) => {
      console.error(err)
    })
})
