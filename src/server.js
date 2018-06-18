const express = require("express");
const app = express();

function middleware(req, res, next) {

}

app.use(function(req, res, next) {
	console.log("New request ;-)");
	next();
});

app.use(function(req, res, next) {
	console.log("Doing auth...");
	
	// next(new Error("Ka-boom from auth!"));
	next();
});

// -----------------------------------

app.get("/", function (req, res) {

    res.send("Hello World!");
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


