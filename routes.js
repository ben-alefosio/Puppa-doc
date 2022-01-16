const express = require('express')
const fsPromises = require('fs').promises

const router = express.Router()

module.exports = router

router.get('/puppies/:id', (req, res) => {
  // console.log('this router works!')
  // res.send('this page works!')
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

// const pup = puppies.find({req.params.id})
// res.render ('puppy', pup)
