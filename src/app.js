const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const MongoClient = require('mongodb').MongoClient;

// const url = 'mongodb://db:27017/booksapi'; // when using docker-compose for full development
const url = 'mongodb://localhost:27017/booksapi';

const promise = MongoClient.connect(url);
const booksPromise = promise.then(function(client) {
    return client.db().collection("books");
});

// let books;
// MongoClient.connect(url, function(err, client) {
//     books = client.db().collection("books");
// });

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

app.get("/", function (req, res) {
    res.send("Hello World!");
});

app.post("/book", function(req, res, next) {
    // destructuring from ES6
    const {title, authors, isbn, description} = req.body;

    booksPromise.then(function(books) {
        return books.updateOne(
            {isbn: isbn},
            {$set : {title, authors, isbn, description} },
            {upsert: true}
        );
    }).then(function() {
        res.json({title, authors, isbn, description});    
    }).catch(next);

});

app.get("/book/:isbn", function (req, res, next) {
    const isbn = req.params.isbn;
    booksPromise
    .then(function(books) {
        return books.findOne({isbn}, { projection: {_id: 0} });
    })
    .then(function(book) {
        res.json(book);
    })
    .catch(next);
});

// -- error handling --

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.json({message: err.message, error: err.stack});
});


module.exports = app;

