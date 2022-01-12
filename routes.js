//store all of our routes.
const express = require('express')
const server = express()
module.exports = server


// << Routes for pupiies>> 
server.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const puppies = puppies.find(item => item.id === id)

  const viewData = {
    titile: 'puppies'
  }
  const template = 'detail'
  res.render(template, viewData)

})

