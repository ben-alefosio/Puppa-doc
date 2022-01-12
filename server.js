const express = require('express')
const hbs = require('express-handlebars')
const fsPromises = require('fs').promises
const routes = require('./routes')

const server = express()

server.use('/puppies', routes)

module.exports = server

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here
server.get('/', (req, res) => {
  fsPromises.readFile('data.json', 'utf8')
    .then((puppy) => {
      const realPuppyData = JSON.parse(puppy)
      console.log(realPuppyData)
      res.render('home', realPuppyData)
      return null
    })
    .catch(err => {
      console.log(err)
    })
})
