const express = require('express')
const hbs = require('express-handlebars')
const { render } = require('express/lib/response')
const fs = require('fs')
const path = require('path')

const server = express()

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here
module.exports = server

// Bring data 
const dogData = require('./data.json')



server.get('/', (req, res) => {
    const viewData = {
        puppies: dogData.puppies
    }
    res.render('home', viewData)
})

server.get('/images/:id', (req, res) => {
    const id = Number(req.params.id)
    const foundId = dogData.find(pic => pic.id === id)
    res.render('images', foundId)
})