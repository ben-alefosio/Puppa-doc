const express = require('express')
const router = express.Router()
const fs = require('fs').promises

module.exports = router


// << Routes for pupiies>> 
router.get('/puppies/:id', (req, res) => {

  const id = Number(req.params.id) - 1
  console.log('id', id)
  fs.readFile('data.json', 'utf-8')
    .then((puppsData) => {

      const data = JSON.parse(puppsData)
      // <<have to check later>>

      // const pupdata = data.find(item => item.id === id)
      // console.log(data)
      // res.render('details', data.puppies[id])

      const viewData = {
        name: data.puppies[id].name,
        breed: data.puppies[id].breed,
        owner: data.puppies[id].owner,
        image: data.puppies[id].image,
        id: id + 1
      }

      res.render('details', viewData)
    })

    .catch(err => {
      console.err('Opps something happend')
    })
})

// << Edit pupiies>> 

router.get('/puppies/:id/edit', (req, res) => {

  const id = Number(req.params.id) - 1

  fs.readFile('data.json', 'utf-8')
    .then((puppsData) => {

      const data = JSON.parse(puppsData)

      const viewData = {
        name: data.puppies[id].name,
        breed: data.puppies[id].breed,
        owner: data.puppies[id].owner,
        image: data.puppies[id].image,
        id: data.puppies[id]
      }
      res.render('edit', viewData)
    })

    .catch(err => {
      console.err('Opps something happend')
    })
})
