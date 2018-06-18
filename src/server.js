const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
	console.log("New request ;-)");
	next();
});

app.use(function(req, res, next) {
	console.log("Doing auth...");
	next();
});

// -----------------------------------

app.get("/", function (req, res) {
    res.send("Hello World!");
});

app.post("/book", function(req, res) {
    // destructuring from ES6
    const {title, authors, isbn, description} = req.body;


    res.json({title, authors, isbn, description});
});

app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
});

// -------------------------------------


app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.json({message: err.message, error: err.stack});
});


