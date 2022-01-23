const express = require('express')
const router = express.Router()
const fsPromises = require('fs/promises')
// const image = require('./data.json')


router.get('/puppies/:id', (req, res) => {


    fsPromises.readFile('data.json', 'utf8')
    .then(data => {
        const dogs = JSON.parse(data)
        
        for(let i=0; i<dogs.puppies.length; i++) {
            if (dogs.puppies[i].id === parseInt(req.params.id)) { 
                console.log('found '+JSON.stringify(dogs.puppies[i]))
                return dogs.puppies[i]
            }

        }
        // console.log("dogs.puppies.id  "+dogs.puppies[0].id)
        // console.log("parsed "+JSON.stringify(JSON.parse(data)))
        
    })
    .then(parsed => {
          
        return res.render('details', parsed)
        
    })
    .catch(error => {
     console.log(error);
    })
})

router.get('/puppies/:id/edit', (req, res) => {
     fsPromises.readFile('data.json', 'utf8')
    .then(data => {
        const dogs = JSON.parse(data)
        
        for(let i=0; i<dogs.puppies.length; i++) {
            if (dogs.puppies[i].id === parseInt(req.params.id)) { 
                console.log('found '+JSON.stringify(dogs.puppies[i]))
                return dogs.puppies[i]
            }

        }
        // console.log("dogs.puppies.id  "+dogs.puppies[0].id)
        // console.log("parsed "+JSON.stringify(JSON.parse(data)))
        
    })
    .then(parsed => {
          
        return res.render('edit', parsed)
        
    })
    .catch(error => {
     console.log(error);
    })
    
})

router.post('/puppies/:id/edit', (req, res) => {
    var requestBody = req.body
    // console.log('post '+JSON.stringify(requestBody))

    fsPromises.readFile('data.json', 'utf8')
    .then(data => {
        const dogs = JSON.parse(data)
        
        for(let i=0; i<dogs.puppies.length; i++) {
            if (dogs.puppies[i].id === parseInt(req.params.id)) { 
                console.log('found '+JSON.stringify(dogs.puppies[i]))
                dogs.puppies[i].name = requestBody.name
                
            }

        }
        // console.log("dogs.puppies.id  "+dogs.puppies[0].id)
        // console.log("dogs "+JSON.stringify(dogs))
        return dogs
        
    })
    .then(parsed => {
        console.log("parsed "+JSON.stringify(parsed))

        // return res.render('edit', parsed)
        fsPromises.writeFile('data.json', JSON.stringify(parsed))
        res.setHeader('Location','/puppies/'+req.params.id)
        res.statusCode=302
        return res.end();

    })
    
    .catch(error => {
     console.log(error);
    })
    
})















module.exports = router













