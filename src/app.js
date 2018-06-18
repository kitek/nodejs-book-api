const express = require("express");
const bodyParser = require("body-parser");
const bookRoutes = require("./bookRoutes");
const error = require("./error");
const app = express();
const path = require("path");

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

app.use("/book", bookRoutes);

app.get("/", function (req, res) {
    res.send("Hello World!");
});

// -- error handling --

app.use(error.clientError);
app.use(error.serverError);

module.exports = app;
