const express = require("express");
const hbs = require("express-handlebars");

const fsPromises = require("fs").promises;

const server = express();

const image = require("./data.json");

// Server configuration
server.use(express.static("public"));
server.use(express.urlencoded({ extended: false }));

// Handlebars configuration
server.engine("hbs", hbs({ extname: "hbs" }));
server.set("view engine", "hbs");

// Your routes/router(s) should go here

server.get("/", (req, res) => {
  const jsonFile = "./data.json";

  fsPromises.readFile(jsonFile);

  const viewData = {
    puppies: image.puppies,
  };

  res.render("home", viewData);
});

server.use;

module.exports = server;
