const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')

const router = require('./routes')

const fsPromises = require('fs').promises

const dogData = path.join(__dirname, 'data.json')

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

    fsPromises.readFile(dogData, 'utf-8')
    .then((contentsOfDataFile) => {

    const turnToObj = JSON.parse(contentsOfDataFile)

    res.render('home', turnToObj)
   

    } )
  
    .catch((err) => {
        console.error(err, 'there is an error')
    })
  })


  
//router
server.use('/puppies/:id', router)