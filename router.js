const fs = require('fs').promises
const express = require('express')

const router = express.Router()

module.exports = router


router.get('/', (req, res) => {
    fs.readFile('data.json', 'utf-8')
        .then(data => {
            return JSON.parse(data)
        })
        .then(parsedData => {
            return res.render('home', parsedData)
        })
        .catch(err => {
            console.error(err.message)
        })
})

router.get('/puppies/:id', (req, res) => {
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

router.get('/puppies/:id/edit', (req, res) => {
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


router.post('/puppies/:id/edit', (req, res) => {
    const id = Number(req.params.id)

    fs.readFile('data.json', 'utf-8')
        .then(data => {
            return JSON.parse(data)
        })
        .then(parsedData => {

            const newdata = JSON.parse(JSON.stringify(req.body, null, 2))
            newdata.id = id

            const filteredData = parsedData.puppies.filter(obj => obj.id !== id)

            const newPuppies = [
                ...filteredData,
                { ...newdata }
            ]
            parsedData.puppies = newPuppies
            parsedData.puppies.sort((a, b) => (a.id > b.id ? 1 : -1))
            return parsedData
        })
        .then((parsedData) => {
            fs.writeFile('data.json', JSON.stringify(parsedData, null, 2), 'utf8')
            return res.redirect(`/puppies/${id}`)
        })
        .catch((err) => {
            console.error(err);
        })

})
