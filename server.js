const express = require('express')
const hbs = require('express-handlebars')
const fsPromises = require('fs').promises
// const path = require('path')

// exports
const routes = ('./routes')

// Import data
// const data = require('./data.json')

const server = express()
module.exports = server

// Server configuration
server.use(express.static('public'))
// sets up file being able to accept encoded data from a form
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here
// makes a file path then turns data.json into an object

// const filepath = path.join(__dirname, 'data.json')

server.get('/', (req, res) => {
  fsPromises.readFile('data.json', 'utf8')
    .then((data) => {
      const pupData = JSON.parse(data)
      console.log(pupData)
      res.render('home', pupData)
      return null
    })
    .catch((err) => {
      console.error(err)
    })
})
