const express = require('express')
const hbs = require('express-handlebars')
const fs = require('fs/promises')
const puppyinfoRoute = require('./routes')

const server = express()

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here
// server.get('/', (req, res) => {
//   res.send('Pupparazzi')
// })

server.use('/puppies', puppyinfoRoute)

server.get('/', (req, res) => {
  fs.readFile('data.json')
    .then(data => {
      return JSON.parse(data)
    })
    .then(lol => {
      return res.render('home', lol)
    })
    .catch(err => {
      console.err(err)
    })
})

module.exports = server
