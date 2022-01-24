const express = require('express')

const fs = require('fs').promises
// const { router } = require('./server')

const router = express.Router()
module.exports = router

const path = require('path')

const dogData = path.join(__dirname, 'data.json')

router.get('/:id', (req, res) => {
  // console.log('test')

  fs.readFile(dogData, 'utf-8')
    .then((contentsOfDataFile) => {
      const turnToObj = JSON.parse(contentsOfDataFile)
      // .find taking puppy that has id of parameter (parameter in URL number returned)
      const viewData = turnToObj.puppies.find(puppy => puppy.id === Number(req.params.id))

      // console.log('number req params', Number(req.params.id));
      res.render('details', viewData)
      return null
    })
    .catch((err) => {
      console.log(err, 'page did not load correctly')
    })
})

router.get('/:id/edit', (req, res) => {
  const id = parseInt(req.params.id)

  fs.readFile(dogData, 'utf-8')
    .then((contentsOfDataFile) => {
      const turnToObj = JSON.parse(contentsOfDataFile)

      const puppyEdit = turnToObj.puppies.find(puppy => puppy.id === id)

      res.render('edit', puppyEdit)
      return null
    })
    .catch((err) => {
      console.log(err, 'edit page did not load correctly')
    })
})

// colon means that it is dynamic
router.post('/:id/edit', (req, res) => {
  const urlId = parseInt(req.params.id)
  // req.body form from website, object not array
  const newPuppyData = req.body
  newPuppyData.id = Number(newPuppyData.id)
  console.log('new puppy data', newPuppyData)

  // readfile always returns a string because of utf=8
  fs.readFile(dogData, 'utf-8')
    .then((data) => {
      // parse makes data into an object so we can process it . arrayof pups is not updated yet.
      const arrayOfPups = JSON.parse(data)

      // remove the id just dealt with. Filter everything except !== id which we just clicked on and updated. Weare going to insert it
      // const puppyEdit = arrayOfPups.puppies.filter(puppy => puppy.id !== id)
      // console.log('array of pups', arrayOfPups)
      const index = arrayOfPups.puppies.findIndex(pup => pup.id === Number(newPuppyData.id))

      const before = arrayOfPups.puppies.slice(0, index)
      const after = arrayOfPups.puppies.slice(index + 1)
      const newArray = [...before, newPuppyData, ...after]

      // object. Putting the new data into the puppies object
      const puppies = { puppies: newArray }
      // console.log(id)
      const finalPup = JSON.stringify(puppies, null, 2)
      console.log('final pup', finalPup)
      // overwrite dogData with final pup, re-renders the whole thing

      return fs.writeFile(dogData, finalPup, 'utf-8')
    })
    .then(res.redirect(`/puppies/${urlId}`))
    .catch((err) => {
      console.error(err, 'there is an error')
    })
})
