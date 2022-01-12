const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')

const fs = require('fs').promises
const server = express()

// Import data from data.json
// const data = require('./data.json')

// Server configuration
// settind up static folder (for HTML, css, imagine etc)
server.use(express.static('public'))
// Tell Express how to process the body of POST routes
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')


// test //
// const filepath = path.join(__dirname, 'data.json')

// server.get('/', (req, res) => {
//   fs.readFile(filepath, 'utf8', (err, puppyData) => {
//     const data = JSON.parse(puppyData)
//     console.log(data)

//     const viewData = {
//       puppies: data.puppies
//     }

//     const template = 'home'
//     res.render(template, viewData)
//   })
// })


// Your routes/router(s) should go here
// << Routes>> 
server.get('/', (req, res) => {
  fs.readFile('./data.json', 'utf-8')
    .then(function (result) {
      const parsedPups = JSON.parse(result)
      const template = 'home'
      const viewData = {
        puppies: parsedPups.puppies
      }
      res.render(template, viewData)
      return null
    })
    .catch(function (error) {
      console.log(error)
    })
})


// Export
module.exports = server
