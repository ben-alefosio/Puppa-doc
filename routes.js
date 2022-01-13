const express = require ('express')
const { fstat } = require('fs')

// const { router } = require('./server')

const router = express.Router()
module.exports = router

const path = require('path')


const dogData = path.join(__dirname, 'data.json')

router.use('/puppies/:id', (req, res) => {
    console.log('test')
    // //const whichPuppy = parseInt(req.params.id) - 1

    // fsPromises.readFile(dogData, 'utf-8')
    // .then((contentsOfDataFile) => {

    // const turnToObj = JSON.parse(contentsOfDataFile)

    // res.render('details', turnToObj.puppies[1])
    res.send(dogData)
   

    } )
