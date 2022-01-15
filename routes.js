const express = require ('express')

const fsPromises = require('fs').promises
// const { router } = require('./server')

const router = express.Router()
module.exports = router

const path = require('path')


const dogData = path.join(__dirname, 'data.json')

router.get('/:id', (req, res) => {
    console.log('test')

   // console.log(req.params.id)
 //  (req.params.id)

    fsPromises.readFile(dogData, 'utf-8')
    .then((contentsOfDataFile) => {

    const turnToObj = JSON.parse(contentsOfDataFile)

    res.render('details', turnToObj.puppies[1])
    
   

    } )
})