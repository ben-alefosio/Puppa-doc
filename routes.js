// express js server/app
const express = require('express')
const app = express()
module.exports = app

const fsPromises = require('fs').promises

const path = require('path')
const data = path.join(__dirname, 'data.json')

// display individual puppies
app.get('/:id', (req, res) => {
  fsPromises.readFile(data, 'utf-8')
    .then((value) => {
      const viewData = JSON.parse(value).puppies.find(value => value.id === Number(req.params.id))
      res.render('details', viewData)
      return null
    })

    .catch((err) => {
      console.error(err, 'Error needs to be resolved')
    })
})

// user story 3 - edit !

app.get('/:id/edit', (req, res) => {
  const id = parseInt(req.params.id)
  fsPromises.readFile(data, 'utf-8')
    .then((value) => {
      const editPuppy = JSON.parse(value).puppies.find(puppy => puppy.id === id)
      res.render('edit', editPuppy)
      return null
    })
    .catch((error) => {
      console.log(error, 'edit page has an error')
    })
})

app.post('/:id/edit', (req, res) => {
  const submittedData = req.body
  submittedData.id = Number(submittedData.id)
  const editID = parseInt(req.params.id)

  fsPromises.readFile(data, 'utf-8')
    .then((value) => {
      const puppyArray = JSON.parse(value)

      const index = puppyArray.puppies.findIndex(value => value.id === submittedData.id)

      const before = puppyArray.puppies.slice(0, index)
      const after = puppyArray.puppies.slice(index + 1)

      const newArray = [...before, submittedData, ...after]
      const puppies = { puppies: newArray }
      const finalPup = JSON.stringify(puppies, null, 2)
      return fsPromises.writeFile(data, finalPup, 'utf-8')
    })
    .then(res.redirect(`/puppies/${editID}`))
    .catch((error) => {
      console.error(error, 'Error with app post method')
    })
})
