const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const puppyData = path.join(__dirname, 'data.json')

const server = express()
const fs = require('fs').promises

const router = require('./routes')

// server.listen(port, function () {
//   // eslint-disable-next-line no-console
//   console.log('Server is listening on port', port)
// })

module.exports = server

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here
server.get('/', (req, res) => {
  fs.readFile(puppyData, 'utf-8')
    .then((insideData) => {
      const obj = JSON.parse(insideData)
      res.render('home', obj)
      return null
    })
    .catch((err) => {
      console.error('error', err)
    })
})

// Router
server.use('/puppies', router)
