const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const MongoClient = require('mongodb').MongoClient;

// const url = 'mongodb://db:27017/booksapi'; // when using docker-compose for full development
const url = 'mongodb://localhost:27017/booksapi';

// MongoClient.connect(url, function(err, client) {
//     if(err) console.log(err);
//     else console.log("Connected successfully to server");
// });

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

    MongoClient.connect(url, function(err, client) {
        client.db().collection("books").updateOne(
            {isbn: isbn},
            { $set: {title, authors, isbn, description} },
            {upsert: true}
        );

        client.close();
    });

    res.json({title, authors, isbn, description});
});

app.get("/book/:isbn", function (req, res) {
    const isbn = req.params.isbn;
    MongoClient.connect(url, function(err, client) {
        client.db().collection("books").findOne({isbn}, function(err, book) {
            res.json(book);
        });

        client.close();
    });
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.json({message: err.message, error: err.stack});
});


module.exports = app;

