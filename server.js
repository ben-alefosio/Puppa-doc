const express = require('express')
const hbs = require('express-handlebars')
const fs = require('fs').promises
const server = express()

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here
server.get('/', (req, res) => {
  fs.readFile('data.json', 'utf-8')
    .then((puppies) => {
      const puppiesJson = JSON.parse(puppies)
      console.log(puppies)
      const viewData = {
        puppies: puppiesJson.puppies
      }
      console.log(viewData)
      res.render('home', viewData)
      return null
    })
    .catch(err => {
      console.error('ops something happend ', err)
    })
})

module.exports = server
