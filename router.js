// const fs = require('fs').promises
// const express = require('express')

// const router = express.Router()

// module.exports = router


// router.get('/', (req, res) => {
//     fs.readFile('data.json', 'utf-8')
//         .then(data => {
//             return JSON.parse(data)
//         })
//         .then(parsedData => {
//             return res.render('home', parsedData)
//         })
//         .catch(err => {
//             console.error(err.message)
//         })
// })


// router.get('/puppies/:id', (req, res) => {
//     const id = Number(req.params.id)

//     fs.readFile('data.json', 'utf-8')
//         .then(data => {
//             const foundObj = data.puppies.find(obj => obj.id == id)
//             console.log(data, foundObj)
//             return JSON.parse(data)
//         })
//         .then(parsedData => {
//             return res.render('detail', parsedData)
//         })
//         .catch(err => {
//             console.error(err.message)
//         })

// })


// router.get('/puppies/:id/edit', (req, res) => {
//     const id = Number(req.params.id)

//     fs.readFile('data.json', 'utf-8')
//         .then(data => {
//             const foundObj = data.puppies.find(obj => obj.id == id)
//             console.log(data, foundObj)
//             return JSON.parse(foundObj)
//         })
//         .then(parsedData => {
//             return res.render('edit', foundObj)
//         })
//         .catch(err => {
//             console.error(err.message)
//         })

// })



// router.post('/puppies/:id/edit', (req, res) => {
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