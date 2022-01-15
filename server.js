const express = require('express')
const hbs = require('express-handlebars')
// const { render } = require('express/lib/response')
// const fs = require('fs').promises
const server = express()

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }));

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

//exprot server
module.exports = server

// Your routes/router(s) should go here

const routertest = require('./router')

server.use(routertest)
//class code랑 다른점은 Path를 넣지 않는다...