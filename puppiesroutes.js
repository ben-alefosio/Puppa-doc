const express = require('express')
const fs = require('fs').promises
const server = require('./server')

const router = express.Router()

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })


// GET puppies page
router.get('/:id', (req, res) => {
    
    const id = Number(req.params.id)
        
    // write fs.promise readfile function 
    fs.readFile('data.json', 'utf-8')
    // loop through puppies
    .then((puppiesArray) => { 
        const data = JSON.parse(puppiesArray)
        
        const puppiesData = data.puppies.find( item => {
            if (item.id === id) {
                return true
            }
                return false
            })
        // send the right puppy
        res.render('details', puppiesData)
    })
    .catch(err => {
        console.error('ops something happend ', err);
    })
})

// GET puppies/:id/edit
router.get('/:id/edit', (req, res) => {

     const id = Number(req.params.id)

    // write fs.promise readfile function 
    fs.readFile('data.json', 'utf-8')
    // loop through puppies
    .then((puppiesArray) => { 
        const data = JSON.parse(puppiesArray)
            
        const puppyData = data.puppies.find(item => {
            if (item.id === id) {
                return true
                }
                return false
            })

            console.log('editting puppy', puppyData)
            // send the right puppy
            res.render('edit', puppyData)
    })
    .catch(err => {
        console.error('ops something happend ', err);
    })

})

// POST puppies/:id/edit
router.post('/:id/edit', urlencodedParser, function (req, res) {
    // Create an object of the updated data from the request body
    const newPuppieData = req.body
    console.log(newPuppieData)
    // Read the json file and locate the puppy that needs updating
    fs.readFile('data.json', 'utf-8')
    .then((puppiesArray) => { 
        const data = JSON.parse(puppiesArray)
        const id = Number(req.params.id)
            
            data.puppies = data.puppies.map(pup => {
                if (pup.id === id) {
                    return {
                        ...newPuppieData,
                        id: Number(newPuppieData.id)
                    }
                }
                return pup
    })
    // Write the entire array back into the JSON file 
    fs.writeFile('data.json', JSON.stringify(data, null, 2))
        .then(() => {
            // Redirect to the GET `/puppies/:id` route
            res.redirect(`/puppies/${id}`)
        })
      
        })
        .catch(err => {
            console.error('ops something happend ', err);
        })
    
})


module.exports = router


