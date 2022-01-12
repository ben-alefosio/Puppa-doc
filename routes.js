const server = require('./server')
const fsPromises = require('fs').promises

server.get('/puppies/:id', (req, res) => {
  const id = Number(req.params.id) - 1
  fsPromises.readFile('./data.json', 'utf-8')
    .then(function (result) {
      const parsedPups = JSON.parse(result)
      console.log(`I am here ${parsedPups}`)
      console.log(parsedPups)
      const template = 'home'
      const viewData = {
        puppies: parsedPups.puppies[id]
      }
      res.render(template, viewData)
      return null
    })
    .catch(function (error) {
      console.log(error)
    })
})
