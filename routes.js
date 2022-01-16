const express = require('express')

const fs = require('fs').promises
// const { router } = require('./server')

const router = express.Router()
module.exports = router

const path = require('path')


const dogData = path.join(__dirname, 'data.json')

router.get('/:id', (req, res) => {
  // console.log('test')

  fs.readFile(dogData, 'utf-8')
    .then((contentsOfDataFile) => {

      const turnToObj = JSON.parse(contentsOfDataFile)


      res.render('details', turnToObj.puppies[req.params.id - 1])

    })
    .catch((err) => {
      console.log('page did not load correctly')
    })
})

router.get('/:id/edit', (req, res) => {

  const id = parseInt(req.params.id)

  fs.readFile(dogData, 'utf-8')
    .then((contentsOfDataFile) => {

      const turnToObj = JSON.parse(contentsOfDataFile)


      const puppyEdit = turnToObj.puppies.find(puppy => puppy.id === id)


      res.render('edit', puppyEdit)

    })
    .catch((err) => {
      console.log('edit page did not load correctly')
    })



  router.post('/:id/edit', (req, res) => {

    newPuppyData = req.body
    console.log(newPuppyData)

    // fs.readFile(dogData, 'utf-8')


  })
})
