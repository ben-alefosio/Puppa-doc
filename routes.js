const express = require('express')
const router = express.Router()

const fs = require('fs').promises
const path = require('path')

module.exports = router

// -------------------------------------------------

// const filepath = path.join(__dirname, 'data.json')

// router.get('/', (req, res) => {
//   fs.readFile(filepath, dogo, 'utf8') 
//     .then(()=> {
//     const parsedOutDog = JSON.parse(dogo)
//     res.send(parsedOutDog)
//     } 
//   })


// router.get('/puppies/:id', (req,res) => {
//     fs.readFile(filepath, 'utf8', (err, contents) => {
//         if (err) {
//             console.error('cant read the file')
//             return
//         }
//             const clean = JSON.parse(contents)
//             if (clean.puppies.id === '1'){

//             }
//             res.render('home', clean.puppies.image)
//         }
//     }
// })
