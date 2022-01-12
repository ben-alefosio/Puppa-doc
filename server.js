const express = require('express')
const hbs = require('express-handlebars')
const { render } = require('express/lib/response')

const fs = require('fs').promises
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

server.get('/puppies/:id', (req, res) => {
    const id = Number(req.params.id)

    const foundObj = dogData.puppies.find(obj => obj.id == id)
    console.log(dogData.puppies)
    res.render('details', foundObj)
})

server.get('/puppies/:id/edit', (req, res) => {
    const id = Number(req.params.id)
    const foundObj = dogData.puppies.find(obj => obj.id == id)

    res.render('edit', foundObj)
})



server.post('/puppies/:id/edit', (req, res) => {
    const id = Number(req.params.id)
    const foundObj = dogData.puppies.find(obj => obj.id === id)

    const newdata = JSON.stringify(req.body, null, 2)

    const changedData = dogData.filter((obj) => { 
        obj.id !== newdata.id
        
    })

    console.log({...changedData})





    res.redirect(`/puppies/${foundObj}`)
})