const express = require('express')

const router = express.Router()

const fs = require('fs').promises
const path = require('path')

const puppiesData = path.join(__dirname, 'data.json')

router.get('/puppies/:id', (req, res) => {
  const id = Number(req.params.id)
  fs.readFile(puppiesData, 'utf-8')
    .then((data) => {
      const puppiesObj = JSON.parse(data)
      const selectPuppy = puppiesObj.puppies.find(puppy => puppy.id === id)
      res.render('details', selectPuppy)
      return null
    })
    .catch(err => {
      console.log('Uh oh, something went wrong', err)
    })
})

router.get('/puppies/:id/edit', (req, res) => {
  fs.readFile(puppiesData, 'utf8')
    .then(data => {
      const pups = JSON.parse(data)

      return pups.puppies.find(puppy => puppy.id === parseInt(req.params.id))
    })
    .then(parsed => {
      return res.render('edit', parsed)
    })
    .catch(error => {
      console.log(error)
    })
})

router.post('/puppies/:id/edit', (req, res) => {
  const id = Number(req.params.id)

  fs.readFile(puppiesData, 'utf8')
    .then(data => {
      const doggies = JSON.parse(data)
      const doggiesArr = doggies.puppies.filter(puppy => JSON.stringify(puppy.id) === req.params.id)
      const noMatch = doggies.puppies.filter(puppy => JSON.stringify(puppy.id) !== req.params.id)

      const newDoggy = {
        id: id,
        image: doggiesArr[0].image,
        breed: req.body.breed,
        name: req.body.name,
        owner: req.body.owner
      }
      noMatch.push(newDoggy)
      const newDawg = { puppies: noMatch }
      return fs.writeFile(puppiesData, JSON.stringify(newDawg)
      )
    })
    .then(() => {
      return res.redirect(`/puppies/${id}`)
    })

    .catch(error => {
      console.log(error)
    })
})

module.exports = router
