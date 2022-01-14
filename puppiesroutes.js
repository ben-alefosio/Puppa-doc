const express = require('express')

const router = express.Router()

module.exports = router

// GET puppies page
router.get('/', (req, res) => {
    res.send('welcome to the puppies page')
})


// GET id page 
router.get('/:id', (req, res) => {

    // write fs.promise readfile function
    // fs.readFile('data.json', 'utf-8')
    // .then((puppiesObject) => { 
    //   const parsedPuppies = JSON.parse(puppiesObject)
    //   console.log(puppiesObject);
    //   const viewData = {
    //     puppies : parsedPuppies.puppies.id
    // }
    // console.log(viewData)
    // res.render('home', viewData)
    // })
    // .catch(err => {
    //   console.error('ops something happend ', err);
    // })
    // res.send('welcome to this cute puppies page')
    console.log("GET : puppy id :" + req.param.id)
})
