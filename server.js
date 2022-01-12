const express = require('express')
const hbs = require('express-handlebars')

const server = express()

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here
server.get('/', (req, res) => {
  const filepath = path.join(__dirname, 'data.json')

  const pups = JSON.parse(data.Puppies)
  const viewData = {
    Puppies: pups
  }
  res.render('home', viewData)
})

module.exports = server
