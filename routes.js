const express = require('express')

const router = express.Router()

const data = require('./data.json')

module.exports = router


console.log('test')

// << Routes for pupiies>> 
router.get('/puppies/:id', (req, res) => {
  const id = Number(req.params.id)
  const puppies = data.find(item => item.id === id)

  const viewData = {
    image: 'caaaaat'
    // name: data.puppies[0].name,
    // breed: data.puppies[0].breed,
    // owner: data.puppies[0].breed
  }
  const template = 'details'
  res.render(template, viewData)
})

