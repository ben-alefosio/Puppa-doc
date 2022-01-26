const express = require('express')
const router = express()
const fs = require('fs/promises')

router.get('/puppies/:id', (req, res) => {
  const pupInfo = parseInt(req.params.id) - 1

  fs.readFile('data.json')
    .then((data) => {
      return JSON.parse(data)
    })
    .then((result) => {
      return res.render('details', result.puppies[pupInfo])
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router
