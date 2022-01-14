 
const express = require('express')
const hbs = require('express-handlebars')
const fs = require('fs').promises
const puppiesRouter = require('./puppiesroutes')

const server = express()

const port = process.env.PORT || 3000


// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))
server.use('/puppiesroutes', puppiesRouter)

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here
server.get('/', (req, res) => {

      // write fs.promise readfile function 
    fs.readFile('data.json', 'utf-8')
    .then((puppiesObject) => { 
      const parsedPuppies = JSON.parse(puppiesObject)
      console.log(puppiesObject);
      const viewData = {
        puppies : parsedPuppies.puppies
    }
    console.log(viewData)
    res.render('home', viewData)
    })
    .catch(err => {
      console.error('ops something happend ', err);
    })


    
  })




module.exports = server

//include tests in your stretch goals 
//don't be bumed out if you dont' get to them 
//data contract what shape the view data will be in 