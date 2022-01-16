const express = require('express')
const hbs = require('express-handlebars')
const fs = require('fs').promises
const server = express()
const routes = require('./routes')  // - Step 2

module.exports = server

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

server.use(routes)  // - Step 2

// Your routes/router(s) should go here
// server.get('/', (req, res) => {
//   fs.readFile('data.json', 'utf-8')
//     .then((puppies) => {
//       const puppiesJs = JSON.parse(puppies)  // parse the data into a JavaScript object
//       res.render('home', puppiesJs)    // render the puppies using the home view
//       return null
//     })
//     .catch(err => {
//       console.error('ops something happend ', err)
//     })
// })

