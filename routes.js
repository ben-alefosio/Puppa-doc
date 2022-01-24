const express = require('express')
const router = express.Router()
module.exports = router
const path = require('path')

const filepath = path.join(__dirname, 'data.json')

const fsPromises = require('fs').promises

router.get('/Home', (req, res) => {
  fsPromises.readFile(filepath, 'utf-8')
    .then((data) => {
      const result = JSON.parse(data)
      //   console.log(puppyData)
      //   const viewData = {
      //     puppyData: puppyView.puppies
      //     // puppyImage: puppyView.image
      //   }
      //   console.log(viewData)
      res.render('home', result)
      return null
    })
    .catch(err => {
      console.error(('ooopsy Daisy', err))
    })
})

// params, :ID

router.get('/puppies/:id', (req, res) => {
  fsPromises.readFile(filepath, 'utf-8')
    .then((details) => {
      const result = JSON.parse(details)
      //   console.log(result)
      //   console.log(result.puppies[1])

      res.render('details', result.puppies[req.params.id - 1])
      return null
    })

    .catch(err => {
      console.error(('ooopsy Daisy', err))
    })
})

router.get('/puppies/:id/edit', (req, res) => {
  console.log('param', req.params.id)
}

)
