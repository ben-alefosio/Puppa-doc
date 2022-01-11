 
const express = require('express')
const hbs = require('express-handlebars')

const server = express()

module.exports = server

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here
server.get('/', (req, res) => {
    res.send('Pupparazzi')
  })


module.exports = server