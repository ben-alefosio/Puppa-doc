/* eslint-disable comma-dangle */
const express = require('express')
const fs = require('fs/promises')

const router = express()

module.exports = router

router.get('/', (req, res) => {
  fs.readFile('data.json')
    .then(data => {
      return JSON.parse(data)
    })
    .then(result => {
      return res.render('home', result)
    })
    .catch(err => {
      console.error(err)
    })
})

router.get('/puppies/:id', (req, res) => {
  const index = parseInt(req.params.id) - 1

  fs.readFile('data.json')
    .then(data => {
      return JSON.parse(data)
    })
    .then(result => {
      return res.render('details', result.puppies[index])
    })
    .catch(err => {
      console.log(err)
    })
})

router.get('/puppies/:id/edit', (req, res) => {
  const index = parseInt(req.params.id) - 1

  fs.readFile('data.json')
    .then(data => {
      return JSON.parse(data)
    })
    .then(result => {
      return res.render('edit', result.puppies[index])
    })
    .catch(err => {
      console.log(err)
    })
})

router.post('/puppies/:id/edit', (req, res) => {
  const index = parseInt(req.params.id)

  const dog = JSON.parse(JSON.stringify(req.body))

  fs.readFile('data.json')
    .then(data => {
      const arrOfPuppies = JSON.parse(data)

      const filteredArrOfPuppies = arrOfPuppies.puppies.filter(
        el => el.id !== parseInt(dog.id)
      )

      const newArrOfPuppies = [
        ...filteredArrOfPuppies,
        {
          id: parseInt(dog.id),
          name: dog.name,
          breed: dog.breed,
          owner: dog.owner,
          image: dog.image,
        },
      ].sort((a, b) => {
        return a.id - b.id
      })
      return newArrOfPuppies
    })
    .then(result => {
      const arr = { puppies: [...result] }
      //   return console.log(arr)
      return fs.writeFile('data.json', JSON.stringify(arr), 'utf-8')
    })
    .then(() => {
      return res.redirect(`/puppies/${index}`)
    })
    .catch(err => {
      console.log(err)
    })
})
