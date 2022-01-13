const express = require('express')
const hbs = require('express-handlebars')
const routes = require('./routes')

const server = express()

// Server configuration

server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here
server.use(routes)

// server.get('/', (req, res) => {
//   fsPromises.readFile('./data.json', 'utf-8')
//     .then(function (result) {
//       const parsedPups = JSON.parse(result)
//       console.log(`I am here ${parsedPups}`)
//       console.log(parsedPups)
//       const template = 'home'
//       const viewData = {
//         puppies: parsedPups.puppies
//       }
//       res.render(template, viewData)
//       return null
//     })
//     .catch(function (error) {
//       console.log(error)
//     })
// })

// // server.use(routes)

module.exports = server

