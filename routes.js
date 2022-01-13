const express = require ('express')
const { router } = require('./server')

const router = express.Router()
module.exports = router

const path = require('path')
const dogData = path.join(__dirname, 'data.json')

router.get('/puppies/:id', (req, res) => {

    res.send('hello')

// res.render(() => {

// })
})