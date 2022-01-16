const express = require('express')
const hbs = require('express-handlebars')
const req = require('express/lib/request')
const fsPromises = require('fs/promises');
const { parse } = require('path');

const image = require('./data.json')
const router = require('./router')
const server = express()

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))
server.use(router)
// server.use(express.static(path.join(__dirname + 'public')));

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here
server.get('/', (req, res) => {
    fsPromises.readFile('data.json', 'utf8')
    .then(data => {
        return JSON.parse(data)
    })
    .then(parsed => {
        return res.render('home', parsed)
        
    })
    .catch(error => {
     console.log(error);
    })
   
    
    // fsPromises.readFile('data.json', 'utf8')

    
    
    
})











module.exports = server
