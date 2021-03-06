const express = require("express");
const bodyParser = require("body-parser");
const bookRoutesFactory = require("./book/bookRoutes");
const error = require("./error");
const path = require("path");

module.exports = async function({ config, auth }) {
  const bookRoutes = await bookRoutesFactory({ config, auth });
  const app = express();

  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "hbs");

  // -- middleware --

  app.use(bodyParser.json());

  app.use(function(req, res, next) {
    console.log("New request ;-)");
    next();
  });

  app.use(function(req, res, next) {
    console.log("Doing auth...");
    next();
  });

  // -- end points --

  app.use("/", bookRoutes);

  app.get("/", function(req, res) {
    res.send("Hello World!");
  });

  // -- error handling --

  app.use(error.clientError);
  app.use(error.serverError);

  return app;
};
