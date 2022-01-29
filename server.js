const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')

const server = express()

// // Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// // Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// //include fs module
const fs = require('fs')
const fsPromises = require('fs').promises

// // Your routes/router(s) should go here
// //use fsPromises.readFile() method
// // // to read the file

server.get('/', (req, res) => {
  fsPromises.readFile('data.json', 'utf-8')
    .then((puppy) => {
      const puppyData = JSON.parse(puppy)
      res.render('home', puppyData)
      return null
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = server
