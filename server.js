const express = require('express')
const hbs = require('express-handlebars')
const fs = require('fs').promises
const path = require('path')

const server = express()

const data = require('./data.json')

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here
// server.get('/', (req, res) => {
//   const viewData = {
//     puppies: data.puppies
//   }
//   res.render('home', viewData)
// })

server.get('/', (req, res) => {
  fs.readFile('data.json', 'utf-8')
    .then(data => {
      return JSON.parse(data)
    })
    .then(parsedData => {
      return res.render('home', parsedData)
    })
    .catch(error => {
      console.error(error.message)
    })
})

server.get('/puppies/:id', (req, res) => {
  const pupObj = data.puppies.find(pup => JSON.stringify(pup.id) === req.params.id)
  const viewData = {
    id: pupObj.id,
    image: pupObj.image,
    breed: pupObj.breed,
    name: pupObj.name,
    owner: pupObj.owner
  }
  res.render('details', viewData)
})

server.get('/puppies/:id/edit', (req, res) => {
  const pupObj = data.puppies.find(pup => JSON.stringify(pup.id) === req.params.id)
  const viewData = {
    id: pupObj.id,
    image: pupObj.image,
    breed: pupObj.breed,
    name: pupObj.name,
    owner: pupObj.owner
  }
  console.log('hi')
  res.render('edit', viewData)
})

server.post('/puppies/:id/edit', (req, res) => {
  const index = req.params.id
  const pupArr = data.puppies.filter(pup => JSON.stringify(pup.id) === req.params.id)
  const pupsArr = data.puppies.filter(pup => JSON.stringify(pup.id) !== req.params.id)
  const newObj = {
    id: parseInt(index),
    image: pupArr[0].image,
    breed: req.body.breed,
    name: req.body.name,
    owner: req.body.owner
  }
  const newArr = pupsArr.push(newObj)
  const newData = { puppies: pupsArr }
  fs.writeFile('data.json', JSON.stringify(newData), 'utf-8')
    .then(() => { return res.redirect(`/puppies/${index}`) })
    .catch(error => {
      console.error(error.message)
    })
  // read file
  // filter file
  // get changed data
  // define new array without the param data, push new param data to array, write data file object with new array
  res.redirect(`/puppies/${index}`)
})

module.exports = server
