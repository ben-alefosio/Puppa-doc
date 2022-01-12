const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')

const fs = require('fs')
const server = express()


// Server configuration
// settind up static folder (for HTML, css, imagine etc)
server.use(express.static('public'))
// Tell Express how to process the body of POST routes
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')


// Your routes/router(s) should go here

// << Routes>> 
// server.get('/', (req, res) => {
//   res.send('Hello this is TOP PAGE!')
// })
server.get('/', (req, res) => {
  const viewData = {
    title: 'Homepage'
  }

  const template = 'home'
  res.render(template, viewData)
})


// test //
const filepath = path.join(__dirname, 'data.json')
console.log(filepath)

fs.readFile(filepath, 'utf8', (err, puppyData) => {
  const puppy = JSON.parse(puppyData)
  console.log(puppy.puppies[0].id)
})

// Export
module.exports = server
