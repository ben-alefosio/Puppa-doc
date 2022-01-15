const express = require('express')
const hbs = require('express-handlebars')
// const { render } = require('express/lib/response')
const fs = require('fs').promises
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

// const router = require('./router')

// server.use('router', router)

server.get('/', (req, res) => {
    fs.readFile('data.json', 'utf-8')
        .then(data => {
            return JSON.parse(data)
        })
        .then(parsedData => {
            console.log(parsedData);
            return res.render('home', parsedData)
        })
        .catch(err => {
            console.error(err.message)
        })
})

server.get('/puppies/:id', (req, res) => {
    const id = Number(req.params.id)

    fs.readFile('data.json', 'utf-8')
        .then(data => {
            return JSON.parse(data)
        })
        .then(parsedData => {
            const foundObj = parsedData.puppies.find(obj => obj.id == id)
            return res.render('details', foundObj)
        })
        .catch(err => {
            console.error(err.message)
        })

})

// server.get('/puppies/:id', (req, res) => {
//     const id = Number(req.params.id)

//     const foundObj = dogData.puppies.find(obj => obj.id == id)

//     res.render('details', foundObj)
// })

server.get('/puppies/:id/edit', (req, res) => {
    const id = Number(req.params.id)
    fs.readFile('data.json', 'utf-8')
        .then(data => {
            return JSON.parse(data)
        })
        .then(parsedData => {
            const foundObj = parsedData.puppies.find(obj => obj.id == id)
            return res.render('edit', foundObj)
        })
        .catch(err => {
            console.error(err.message)
        })
})

// server.get('/puppies/:id/edit', (req, res) => {
//     const id = Number(req.params.id)
//     const foundObj = dogData.puppies.find(obj => obj.id == id)

//     res.render('edit', foundObj)
// })



// server.post('/puppies/:id/edit', (req, res) => {
//     const id = Number(req.params.id)

//     fs.readFile('data.json', 'utf-8')
//         .then(data => {
//             return JSON.parse(data)
//         })
//         .then(parsedData => {

//             const newdata = JSON.parse(JSON.stringify(req.body, null, 2))
//             newdata.id = id

//             const filteredData = parsedData.puppies.filter(obj => obj.id !== id)

//             const newPuppies = [
//                 ...filteredData,
//                 { ...newdata }
//             ]
//             return newPuppies
//         })
//         // .then((newPuppies) => {
//         //     return fs.writeFile('data.json', JSON.stringify(newPuppies, null, 2), 'utf8')
//         // })
//         // .then(()=>{
//         //     return res.redirect(`/puppies/${id}`)
//         // })
//         // .catch((err) => {
//         //     console.error(err);
//         // })

// })

// server.post('/puppies/:id/edit', (req, res) => {
//     const paramsid = Number(req.params.id)

//     const newdata = JSON.parse(JSON.stringify(req.body, null, 2))
//     newdata.id = paramsid

//     dogData.puppies = dogData.puppies.filter(obj => obj.id !== paramsid)

//     const list = dogData.puppies
//     dogData.puppies = [
//         ...list,
//         { ...newdata }
//     ]

//     const filePath = path.join(__dirname, '/data.json')


//     fs.writeFile(filePath, JSON.stringify(dogData, null, 2), 'utf8')
//         .catch((err) => {
//             console.error(err);
//         })

//     res.redirect(`/puppies/${paramsid}`)
// })