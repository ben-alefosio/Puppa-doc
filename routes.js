const express = require('express')
const { reset } = require('nodemon')
const router = express.Router()
const fsPromises = require('fs').promises

module.exports = router

// Get puppies' id page
// Full route - GET /puppies/:id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)

  fsPromises.readFile('data.json', 'utf8')
    .then((data) => {
      const parsePuppyData = JSON.parse(data)
      const findPuppyData = parsePuppyData.puppies.find(pup => pup.id === id)
      res.render('details', findPuppyData)
      return null
    })
    .catch(err => {
      console.error(err.message)
    })
})

// Get puppies edit page
// Full route - GET /puppies/:id/edit
router.get('/:id/edit', (req, res) => {
  const id = Number(req.params.id)

  fsPromises.readFile('data.json', 'utf8')
    .then((data) => {
      const parsePuppyData = JSON.parse(data)
      const findPuppyData = parsePuppyData.puppies.find(pup => pup.id === id)
      res.render('edit', findPuppyData)
      return null
    })
    .catch(err => {
      console.error(err.message)
    })
})
