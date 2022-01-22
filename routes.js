const express = require('express')
const router = express.Router()
const fsPromises = require('fs').promises

module.exports = router

// Get puppies' id page
// Full route - GET /puppies/:id
router.get('/puppies/:id', (req, res) => {
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
router.get('/puppies/:id/edit', (req, res) => {
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

router.post('/puppies/:id/edit', (req, res) => {
  const id = parseInt(req.params.id)

  fsPromises.readFile('data.json', 'utf8')
    .then(data => {
      const parseData = JSON.parse(data)
      const newData = JSON.parse(JSON.stringify(req.body, null, 2))
      const filterDogs = parseData.puppies.filter(pup => pup.id !== parseInt(newData.id))

      // new array of puppies with updated pup
      const newPuppyArr = [
        ...filterDogs,
        {
          id: parseInt(newData.id),
          name: newData.name,
          breed: newData.breed,
          owner: newData.owner,
          image: newData.image
        }
      ]
      newPuppyArr.sort((a, b) => {
        return a.id - b.id
      })
      return newPuppyArr
    })
    .then(result => {
      // Putting new data array into object so that it can be JSON stringified
      const finalData = { puppies: [...result] }
      return fsPromises.writeFile('data.json', JSON.stringify(finalData, null, 2), 'utf8')
    })
    .then(() => {
      return res.redirect(`/puppies/${id}`)
    })
    .catch(err => {
      console.error(err)
    })
})
