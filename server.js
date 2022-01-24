const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')

const fs = require('fs').promises
const puppiesData = path.join(__dirname, 'data.json')

const server = express()

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

server.get('/', (req, res) => {
  fs.readFile(puppiesData, 'utf-8')
    .then((puppiesArray) => {
      const puppiesObj = JSON.parse(puppiesArray)

      res.render('home', puppiesObj)
      return null
    })
    .catch(err => {
      console.error('opps something happend ', err)
    })
})

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here

module.exports = server
