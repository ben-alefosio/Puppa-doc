const express = require('express')
const fsPromises = require('fs').promises

const router = express.Router()

module.exports = router

// ------- VIEW INDIVIDUAL PUPPIES WHEN CLICKED ON -------
router.get('/puppies/:id', (req, res) => {
  const id = Number(req.params.id)

  fsPromises.readFile('data.json', 'utf8')
    .then((data) => {
      const pupData = JSON.parse(data)
      const pupId = pupData.puppies.find(ele => ele.id === id) // if the id matches, render the pup that matches the id
      res.render('details', pupId)

      return null
    })
    .catch((err) => {
      console.error(err)
    })
})

// USER STORY 3 - GET
// ------- FROM INDIVIDUAL PAGE -> EDITING PUPPY INFO (FORM) -------
router.get('/puppies/:id/edit', (req, res) => {
  const id = Number(req.params.id)
  // console.log(id)

  fsPromises.readFile('data.json', 'utf8')
    .then((data) => {
      const pupData = JSON.parse(data)
      const pupId = pupData.puppies.find(ele => ele.id === id)
      res.render('edit', pupId)

      return null
    })
    .catch((err) => {
      console.error(err)
    })
})

// USER STORY 3 - POST
// ------- EDIT FORM AND SUBMIT IT TO UPDATE DATA --------

// RENDERS EDIT PAGE
router.post('/puppies/:id/edit', (req, res) => {
  const pathId = Number(req.params.id) // used on line 78

  const newPupData = req.body // requires what is entered in the form by the user
  newPupData.id = Number(newPupData.id)

  fsPromises.readFile('data.json', 'utf8')
    .then((data) => { // data becomes a container for data.json
      const pupData = JSON.parse(data) // pupData is a str (because of 'utf-8') --> obj

      const indexNum = pupData.puppies.findIndex(
        updatePup => updatePup.id === Number(newPupData.id) // alternative to Number ... parseInt
      )
      // pupData.puppies = refering to all data - from data.json
      // .findIndex = method that returns index in arr that matches whatever follows in the ()
      // updatePup = a container that is used - any word can be put there
      // updatePup.id === Number(newPupData.id) = if the ID matches the number(which has been turned str -> int/num )
      // newPupData decleared on line 52

      const before = pupData.puppies.slice(0, indexNum)
      const after = pupData.puppies.slice(indexNum + 1)
      const newPupArr = [...before, newPupData, ...after] // newPupData = what submitted by the user via req.body
      const updatedPuppiesData = { puppies: newPupArr }

      const updatedPupData = JSON.stringify(updatedPuppiesData, null, 2)

      // ------- OVERWRITE THE OLD DATA WITH NEW DATA FROM ABOVE - updatedPuppiesData -------

      return fsPromises.writeFile('data.JSON', updatedPupData, 'utf-8')
    })
    .then(res.redirect(`/puppies/${pathId}`))
    .catch((err) => {
      console.error(err, 'Error!')
    })
})
