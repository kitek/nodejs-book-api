const express = require("express");
const bodyParser = require("body-parser");
const bookRoutes = require("./bookRoutes");
const app = express();

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

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.json({message: err.message, error: err.stack});
});


module.exports = app;

