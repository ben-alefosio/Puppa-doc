const express = require('express')
const router = express.Router()
module.exports = router
const path = require('path')
const server = require('server')

const filepath = path.join(__dirname, 'data.json')

const fsPromises = require('fs').promises

router.get('/data', (req, res) => {
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

  // params, :ID

  router.get('puppies/:1', (req, res) => {
    fsPromises.readFile(filepath, 'utf-8')
      .then((details) => {
        const result = JSON.parse(details)

        res.render('details', result)
        return null
      })

      .catch(err => {
        console.error(('ooopsy Daisy', err))
      })
  })

