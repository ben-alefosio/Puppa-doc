const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')

const fs = require('fs')
const server = express()

// Import data
const data = require('./data.json')

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



// test //
const filepath = path.join(__dirname, 'data.json')

server.get('/', (req, res) => {
  fs.readFile(filepath, 'utf8', (err, puppyData) => {
    const puppy = JSON.parse(puppyData)
    console.log(puppy.name)
  })


  const viewData = {
    puppies: data.puppies,
    id: data.puppies[0].id,
    image: data.puppies[0].image,
    name: data.puppies[0].name
    // id: puppy.puppies[0].id,
  }
  const template = 'home'
  res.render(template, viewData)


})

// const filepath = path.join(__dirname, 'data.json')
// fs.readFile(filepath, 'utf8')
//   .then((data) => {
//     const pupData = JSON.parse(data)
//     console.log(pupData)
//     return pupData
//   })
//   .catch((err) => {
//     console.error(err)
//   })



// Export
module.exports = server
