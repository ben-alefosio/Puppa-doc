const express = require('express')
const fs = require('fs').promises
const server = require('./server')

const router = express.Router()


// GET puppies page
router.get('/:id', (req, res) => {
    
    // id === req.params.id
    const id = Number(req.params.id) - 1
        
    // write fs.promise readfile function 
    fs.readFile('data.json', 'utf-8')
    // loop through puppies
    .then((puppiesArray) => { 
    const data = JSON.parse(puppiesArray)
    
    const puppiesData = data.puppies.find( item => item.id -1 === id)
    // send the right puppy
    res.render('details', puppiesData)
    })
    .catch(err => {
        console.error('ops something happend ', err);
    })
})

// GET puppies/:id/edit
router.get('/:id/edit', (req, res) => {

     // id === req.params.id
     const id = Number(req.params.id) - 1

    // write fs.promise readfile function 
    fs.readFile('data.json', 'utf-8')
    // loop through puppies
    .then((puppiesArray) => { 
        const data = JSON.parse(puppiesArray)
        
        const puppiesData = data.puppies.find( item => item.id -1 === id)
        // send the right puppy
        res.render('edit', puppiesData)
        })
        .catch(err => {
            console.error('ops something happend ', err);
        })

})

// POST puppies/:id/edit
router.post('/:id/edit', (req, res) => {
    // create object from req.body
    console.log(req.body)

    // {
    //     "id": "req.body.id",
    //     "name": "req.body.name",
    //     "owner": "req.body.owner",
    //     "breed": "req.body.breed"
    //   }
})


module.exports = router


