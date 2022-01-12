// Requires
const fs = require('fs')
const path = require('path')// Maybe

// Exports
module.exports = {
  getPupData
}

// Functions
getPupData(cb){
  const filepath = path.join(__dirname, "data.json");
  fs.readFile(filepath, "utf-8", (err, pupDataPrim) => {
    if(err){
      console.error("Can't read data")
      return
    }
    try {
      const pupData = JSON.parse(pupDataPrim)
      console.log(pupData)
      cb(pupData)
    }
    catch (parseErr){
      console.error("Messy file")
    }
  })
}
