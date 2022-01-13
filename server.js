const express = require('express')
const hbs = require('express-handlebars')
const routes = require('./routes.js')

const server = express()

// // fs
const fs = require('fs')
const path = require('path')

// Server configuration
// const publicFolder = path.join(__dirname, 'public')
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration "middleware"
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

server.use('/puppies', routes)

module.exports = server

// Your routes/router(s) should go here

const filepath = path.join(__dirname, 'data.json')

// console.log(filepath)
// const realPuppyData = JSON.parse(filepath)

server.get('/', (req, res) => {
  // console.log('hello initial')
  data = fs.readFile(filepath, 'utf8', (err, contents) => {
    if (err) {
      console.error('sorry buddy, I cant read your file')
      return
    }
    // console.log("hello again")
    const parsedContents = JSON.parse(contents)
    const viewData = {
      puppies: parsedContents.puppies
    }
    // console.log(viewData)
    // console.log(parsedContents)
    res.render('home', viewData)
  })
})

// function test () {
//     const filepath = path.join(__dirname, 'data.json')
//     const realPuppyData = JSON.parse(filepath)
//     console.log(realPuppyData)
// }

// console.log('testing the parse' + test())

// function getData () {
//     const filepath = path.join(__dirname, 'data.json')
//     fs.readFile(filepath, 'utf8', (err, puppyData) => {
//         if (err) {
//             console.error('sorry, the getData function cannot read the file')
//             return
//         }
//         const realPuppyData = JSON.parse(puppyData)
//         console.log('This is a getData console.log result: ' + realPuppyData.puppies)
//     })
// }

// const initialData = getData()
// console.log('This is the initialData console.log result: ' + initialData)

// server.get('/', (req, res) => {
//     fs.promises.readFile("data.json")
//     .then((data) => {
//         res.send(data)
//     })
//     .catch(err => {
//         console.error('this is broke', err);
//     })

// })

// server.get('/puppies', (req,res) => {
//     const filepath = path.join(__dirname, 'data.json')
//     fs.readFile(filepath, 'utf8', (err, data) => {
//         if (err) {
//             console.error('Cant read the file')
//             return
//         }
//         try {
//             const realData = JSON.parse(data)
//         } catch (erra) {
//             console.error('I cant understand the file')
//             return
//         }

//     })
// console.log(realData)
// })
