const express = require('express')
const router = express.Router()
const fs = require('fs').promises

module.exports = router

// Accept URL encoded data on POST request
router.use(express.urlencoded({ extended: false }))

// << Routes for pupiies>> 
router.get('/puppies/:id', (req, res) => {
  // console.log('param', req.params.id)
  const id = Number(req.params.id) - 1
  // console.log('id', id)

  fs.readFile('data.json', 'utf-8')
    .then((puppsData) => {

      const data = JSON.parse(puppsData)
      // console.log('xxx', data.puppies[id].id)
      const pupdata = data.puppies.find(item => item.id - 1 === id)
      // console.log('this is pupdata', pupdata)

      // ----- << not good way but still working>> ------
      // const viewData = {
      //   name: data.puppies[id].name,
      //   breed: data.puppies[id].breed,
      //   owner: data.puppies[id].owner,
      //   image: data.puppies[id].image,
      //   id: id + 1
      // }
      // res.render('details', viewData)
      // --------------------------------------------------

      res.render('details', pupdata)
    })

    .catch(err => {
      console.err('Opps something happend')
    })
})

// << Edit pupiies>> 

router.get('/puppies/:id/edit', (req, res) => {

  const id = Number(req.params.id) - 1

  fs.readFile('data.json', 'utf-8')
    .then((puppsData) => {

      const data = JSON.parse(puppsData)
      const pupdata = data.puppies.find(item => item.id - 1 === id)

      res.render('edit', pupdata)
    })

    .catch(err => {
      console.err('Opps something happend')
    })
})

// << post route>>
// 1. Create an object of the updated puppy data from the request body
// 2. Read in the JSON file and locate the puppy we are going to update
// 3. Update the puppy in the array
// 4. Write the entire array back into the JSON file
// 5. Redirect to the GET / puppies /: id route

router.post('/puppies/:id/edit', (req, res) => {
  console.log(req.body)
  res.send('hey')
})

