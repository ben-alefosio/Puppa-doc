const express = require('express')
const { json } = require('express/lib/response')
const router = express.Router()
const fsPromises = require('fs/promises')
// const image = require('./data.json')


router.get('/puppies/:id', (req, res) => {


    fsPromises.readFile('data.json', 'utf8')
    .then(data => {
        const dogs = JSON.parse(data)

       return dogs.puppies.find(puppy => puppy.id === parseInt(req.params.id))
        
        // for(let i=0; i<dogs.puppies.length; i++) {
        //     if (dogs.puppies[i].id === parseInt(req.params.id)) { 
        //         console.log('found '+JSON.stringify(dogs.puppies[i]))
        //         return dogs.puppies[i]
        //     }

        // }
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

        return dogs.puppies.find(puppy => puppy.id === parseInt(req.params.id))
        
        
        // for(let i=0; i<dogs.puppies.length; i++) {
        //     if (dogs.puppies[i].id === parseInt(req.params.id)) { 
        //         console.log('found '+JSON.stringify(dogs.puppies[i]))
        //         return dogs.puppies[i]
        //     }

        // }
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

    const id = Number(req.params.id) 
    
    // console.log('post '+JSON.stringify(requestBody))

    fsPromises.readFile('data.json', 'utf8')
    .then(data => {
       const dogs = JSON.parse(data)
       const dogsArr = dogs.puppies.filter(puppy => JSON.stringify(puppy.id) === req.params.id)
       const noMatch = dogs.puppies.filter(puppy => JSON.stringify(puppy.id) !== req.params.id)
        
       const newDog = {
           id: id,
           image: dogsArr[0].image,
           breed: req.body.breed,
           name: req.body.name,
           owner: req.body.owner,
       }
        noMatch.push(newDog)
        const newDoggy = { puppies: noMatch }
        return fsPromises.writeFile('data.json', JSON.stringify(newDoggy)
        )
        
    })
    .then(() => {
        
     return res.redirect(`/puppies/${id}`);
        
        // res.setHeader('Location','/puppies/'+req.params.id)
        // res.statusCode=302
        // return res.end();

    })
    
    .catch(error => {
     console.log(error);
    })
    
})















module.exports = router













