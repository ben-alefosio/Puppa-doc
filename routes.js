const express = require('express')
const router = express.Router()

const fs = require('fs').promises
const path = require('path')

module.exports = router

// -------------------------------------------------

// router.get('/hello', (req, res) => {
//   fs.readFile(filepath, dogo, 'utf8')
//     .then(() => {
//       const parsedOutDog = JSON.parse(dogo)
//       res.send('home', parsedOutDog)
//     })
//     .catch((err) =>
//       console.error('fail'))
// })

const filepath = path.join(__dirname, 'data.json')

router.get('/', (req, res) => {
  console.log('sup router')
  fs.readFile(filepath, 'utf8')
    .then(data => {
      return JSON.parse(data)
    })
    .then(parsedDoggo => {
      return res.render('home', parsedDoggo)
    })
    .catch(error => {
      console.error(error.message)
    })
})

// const filepath = path.join(__dirname, 'data.json')

router.get('/:id', (req, res) => {
  console.log('sup router')
  fs.readFile(filepath, 'utf8')
    .then(data => {
      return JSON.parse(data)
    })
    .then(parsedDoggo => {
      const dogObject = parsedDoggo.puppies.find(indPuppy => JSON.stringify(indPuppy.id) === req.params.id)
      console.log (dogObject)
      const viewData = {
        hey: dogObject.puppies.id,
        hello: dogObject
      }
      return res.render('home', viewData)
    })
  .catch(error => {
    console.error(error.message)
  })
})
// const filepath = path.join(__dirname, 'data.json')

// router.get('/hello', (req, res) => {
//     .then(() => {
//       const parsedOutDog = JSON.parse(dogo)
//       res.send('home', parsedOutDog)
//     })
//     .catch((err) =>
//       console.error('fail'))
// })

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
