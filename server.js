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

module.exports = server

// 1. In the server.js, add an HTTP GET root route (/). For now, let's just send the word 'Pupparazzi'
// Start the server and go to http://localhost:3000 to see if we are winning

server.get('/', (req, res) => {
  res.send('Hey Pupparazzi')
})

//   2. In our server file, change the GET / route function. We will use this route to:

// read the puppies from our data.json file using fsPromises.readFile (don't forget to parse the data into a JavaScript object)
// render the puppies using the home view (that has already been created) and your puppies data
// If your page renders, but there are no puppies:

// check what data the view is expecting to receive
// console.log the view data object you are passing to the render and make sure this matches what the view is expecting

const fs = require('fs').promises
// const fs = require('fs/promises')

// reading files using fs/promises
const p = fs.readFile('data.json', 'utf-8')
  .then(() => {
    console.log('file is saved')
    return null
  })
  .catch(err => {
    console.error('ops something happend ', err)
  })
// writing to files

console.log(p)
