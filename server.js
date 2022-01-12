 
const express = require('express')
const hbs = require('express-handlebars')
const fs = require('fs').promises
// const data = require('./data.json')

const server = express()


// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here
server.get('/', (req, res) => {

    fs.readFile('data.json', 'utf-8')

    .then((puppies) => { 
      JSON.parse(puppies)
      console.log(puppies);
    })
    .catch(err => {
      console.error('ops something happend ', err);
    })

    // res.render('home', viewData)
  })

  // write fs.promise readfile function 
 
  


// const p = fs.readFile(puppyData, 'utf-8)

//   const p = JSON.parse(fs.readFile('data.json', 'utf-8'))


  //console.log(JSON.parse(p))
  console.log('Hi')



module.exports = server