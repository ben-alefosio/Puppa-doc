const express = require('express')
const fs = require('fs/promises')

const router = express()

module.exports = router

router.get('/puppies/:id', (req, res) => {
    const getId = req.params.id - 1
    console.log(getId)
    
    fs.readFile('data.json')
    .then(data => {
        return JSON.parse(data)
    })
    .then(parsedData => {
        return res.render('details', parsedData.puppies[getId])
    })
    .catch(err => {
        console.error(err.message)
    })  
  })