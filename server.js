const express = require('express')
const hbs = require('express-handlebars')
const router = require('./routes')
const server = express()

// // Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// // Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// // Routes config
server.use('/', router)

// //include fs module
const fsPromises = require('fs').promises

// // Your routes/router(s) should go here
// //use fsPromises.readFile() method
// // // to read the file

server.get('/', (req, res) => {
  fsPromises.readFile('data.json', 'utf-8')
    .then((puppy) => {
      const puppyData = JSON.parse(puppy)
      res.render('home', puppyData)
      return req
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = server
