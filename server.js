const express = require('express')
const hbs = require('express-handlebars')
const { render } = require('express/lib/response')

const fs = require('fs').promises
const path = require('path')

const server = express()

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }));

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
    //sort items
    dogData.puppies.sort((a, b) => (a.id > b.id ? 1 : -1))

    res.render('home', viewData)
})

server.get('/puppies/:id', (req, res) => {
    const id = Number(req.params.id)

    const foundObj = dogData.puppies.find(obj => obj.id == id)

    res.render('details', foundObj)
})

server.get('/puppies/:id/edit', (req, res) => {
    const id = Number(req.params.id)
    const foundObj = dogData.puppies.find(obj => obj.id == id)

    res.render('edit', foundObj)
})


server.post('/puppies/:id/edit', (req, res) => {
    const paramsid = Number(req.params.id)

    const newdata = JSON.parse(JSON.stringify(req.body, null, 2))
    newdata.id = paramsid

    dogData.puppies = dogData.puppies.filter(obj => obj.id !== paramsid)

    const list = dogData.puppies
    dogData.puppies = [
        ...list,
        { ...newdata }
    ]

    const filePath = path.join(__dirname, '/data.json')


    fs.writeFile(filePath, JSON.stringify(dogData, null, 2), 'utf8')
        .catch((err) => {
            console.error(err);
        })

    res.redirect(`/puppies/${paramsid}`)
})