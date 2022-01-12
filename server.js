const express = require('express')
const hbs = require('express-handlebars')
const fsPromises = require('fs').promises

// const datas = require('./data.json')
// console.log(datas.puppies)
// console.log(datas.puppies[0].image)

const server = express()

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// let parsedPups

// fsPromises.readFile('./data.json', 'utf-8')
//   .then(function (result) {
//     parsedPups = JSON.parse(result)
//     console.log(`I am here ${parsedPups}`)
//     console.log(parsedPups)
//     return parsedPups
//   })
//   .catch(function (error) {
//     console.log(error)
//   })

// Your routes/router(s) should go here
server.get('/', (req, res) => {
  fsPromises.readFile('./data.json', 'utf-8')
    .then(function (result) {
      const parsedPups = JSON.parse(result)
      console.log(`I am here ${parsedPups}`)
      console.log(parsedPups)
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

module.exports = server
