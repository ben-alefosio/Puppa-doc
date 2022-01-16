const express = require("express");
const hbs = require("express-handlebars");
const fsPromises = require("fs").promises;

const server = express();
module.exports = server;

// Server configuration
server.use(express.static("public"));
server.use(express.urlencoded({ extended: false }));

// Handlebars configuration
server.engine("hbs", hbs({ extname: "hbs" }));
server.set("view engine", "hbs");

// Your routes/router(s) should go here
server.get("/", (req, res) => {
  fsPromises.readFile("data.json", "utf8").then((data) => {
    const viewData = JSON.parse(data);
    res.render("home", viewData);
    return null;
  });
});
