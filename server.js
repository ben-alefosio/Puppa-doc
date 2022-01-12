const express = require('express')
const hbs = require('express-handlebars')
const router = require('./routes')

const server = express()

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here

router.use('/', routes)

server.get('/', (res, req) => {
  res.send('Heyo')
})

module.exports = server
