const express = require('express')
const hbs = require('express-handlebars')
const res = require('express/lib/response')
const { get } = require('express/lib/response')

const router = express.Router()
const fs = require('fs').promises
const fsPromises = fs

const server = express()

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here

server.get('/', (req, res) => {
  res.send('pupparazi')
})

// fsPromises.readFile('/data', 'utf-8')

//   .then(() => {
//     console.log()
//   })
//   .catch(err => {
//     console.error('ooopsy daisy', err)
//   })

module.exports = server
