const express = require('express')
const fsPromises = require('fs').promises

const router = express.Router()

module.exports = router

// Access to page - details.hbs
router.get('/puppies/:id', (req, res) => {
  const id = Number(req.params.id)

  fsPromises.readFile('data.json', 'utf8')
    .then((data) => {
      const pupData = JSON.parse(data)
      const pupId = pupData.puppies.find(ele => ele.id === id)
      res.render('details', pupId)

      return null
    })
    .catch((err) => {
      console.error(err)
    })
})

// Access to page - edit.hbs
router.get('/puppies/:id/edit', (req, res) => {
  const id = Number(req.params.id)
  console.log(id)

  fsPromises.readFile('data.json', 'utf8')
    .then((data) => {
      const pupData = JSON.parse(data)
      const pupId = pupData.puppies.find(ele => ele.id === id)
      res.render('edit', pupId)

      return null
    })
    .catch((err) => {
      console.error(err)
    })
})
// const pup = puppies.find({req.params.id})
// res.render ('puppy', pup)
