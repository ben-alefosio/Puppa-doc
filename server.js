const express = require('express')
const hbs = require('express-handlebars')
const fs = require('fs').promises
const path = require('path')

// Import data
const data = require('./data.json')

const server = express()
module.exports = server

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here
server.get('/', (req, res) => {
// makes a file path then turns data.json into an object
  const filepath = path.join(__dirname, 'data.json')
  console.log(filepath)

  //   fs.readFile(filepath, 'utf8', (_err, data) => {
  //     const pupData = JSON.parse(data)
  //     console.log(pupData)
  //   })
  const viewData = {
    title: 'Pupparazzo',
    puppies: data.puppies,
    id: data.puppies[0].id,
    image: data.puppies[0].image,
    name: data.puppies[0].name
  }
  const template = 'home'
  res.render(template, viewData)
  // console.log(viewData)
})

// the 'promise' way to read a file

// const filepath = path.join(__dirname, 'data.json')
// fs.readFile(filepath, 'utf8')
//   .then ((data) => {
//     const pupData = JSON.parse(data)
//     console.log(pupData)
//     return pupData
//   })
//   .catch((err) => {
//     console.error(err)
//   })
