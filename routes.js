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

router.get('/puppies/:id', (req, res) => {
  // console.log('sup router')
  fs.readFile(filepath, 'utf8')
    .then(data => {
      return JSON.parse(data)
    })
    .then(parsedDoggo => {
      const dogObject = parsedDoggo.puppies.find(indPuppy => JSON.stringify(indPuppy.id) === req.params.id)
      // console.log ('this is the dogObject inside of then /puppies/id router', dogObject)
      const viewData = {
        id: dogObject.id,
        image: dogObject.image,
        name: dogObject.name,
        breed: dogObject.breed,
        owner: dogObject.owner
      }
      // console.log(viewData)
      return res.render('details', viewData)
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

router.get('/puppies/:id/edit', (req, res) => {
  // console.log('sup router')
  fs.readFile(filepath, 'utf8')
    .then(data => {
      return JSON.parse(data)
    })
    .then(parsedDoggo => {
      const dogObject = parsedDoggo.puppies.find(indPuppy => JSON.stringify(indPuppy.id) === req.params.id)
      // console.log ('this is the dogObject inside of then /puppies/id router', dogObject)
      const viewData = {
        id: dogObject.id,
        image: dogObject.image,
        name: dogObject.name,
        breed: dogObject.breed,
        owner: dogObject.owner
      }
      // console.log(viewData)
      return res.render('edit', viewData)
    })
    .catch(error => {
      console.error(error.message)
    })
})

// << post route>>
// 1. Create an object of the updated puppy data from the request body
// 2. Read in the JSON file and locate the puppy we are going to update
// 3. Update the puppy in the array
// 4. Write the entire array back into the JSON file
// 5. Redirect to the GET / puppies /: id route
// _______________________________________________________________________

router.post('/puppies/:id/edit', (req, res) => {
// post route, what will happen on this page after a submit button is clicked

  const doggy = req.body
  // req.body will take the data from the form
  const whereisdoggyinarray = Number(doggy.id)
  // or
  // const index = parseInt(req.params.id)

  // we want to know in a  number where the object sits in the array for the return path

  // take the req.body data and turn it into an object
  const obj = JSON.parse(JSON.stringify(req.body))
  // console.log(typeof obj)

  fs.readFile(filepath, 'utf8')
    .then(data => {
      const parsedData = JSON.parse(data)
      // take the main dataset and parse it, as it's in JSON.

      const oneParsedOutDog = parsedData.puppies.filter(
        // get an objext for the dog that we're editing. Will take out parsed data and filter it based on the id.
        thisisjustaplaceholder => thisisjustaplaceholder.id !== parseInt(obj.id)
        // aka parseInt is parse and interger, takes a string and returns an interger. could also use number.
      )
// make a new array from the objectabove using a shallow copy (aka ... spread operator)
      const newArray = [...oneParsedOutDog,
        {
          id: parseInt(obj.id),
          name: obj.name,
          breed: obj.breed,
          owner: obj.owner,
          image: obj.image
        }
      ].sort((a, b) => {
        return a.id - b.id
      })
      return newArray
    })
    .then(result => {
      const arr = { puppies: [...result] }
      console.log('this is your arr object', arr)
      return fs.writeFile(filepath, JSON.stringify(arr))
    })
    .then(() => {
      return res.redirect(`/puppies/${whereisdoggyinarray}`)
    })
    .catch(err => {
      console.error(err, 'fuck!')
    })
})
