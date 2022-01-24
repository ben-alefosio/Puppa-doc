const express = require('express')
const router = express()
const fs = require('fs/promises')

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

module.exports = router
