// express js server/app
const express = require('express')
const app = express()
module.exports = app

// handlebar module & config
const hbs = require('express-handlebars')
app.engine('hbs', hbs({ extname: 'hbs' }))
app.set('view engine', 'hbs')

// path module
const path = require('path')
const data = path.join(__dirname, 'data.json')

// server configuration
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

// filesystem and promises
const fsPromises = require('fs').promises

// Your routes/router(s) should go here
app.get('/', (req, res) => {
  fsPromises.readFile(data, 'utf-8')
    .then((thisIsTheDoggyDataThatIamPassingInToRender) => {
      res.render('home', JSON.parse(thisIsTheDoggyDataThatIamPassingInToRender))
      return null
    })
    .catch((err) => {
      console.error(err, 'Error needs to be resolved')
    })
})

// Import and use routes.js
const router = require('./routes')
app.use('/puppies', router)

// cmd + D for selecting all same words on the page
