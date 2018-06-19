module.exports = async function routerFactory() {
	const router = require('express').Router();

	// const url = 'mongodb://db:27017/booksapi'; // when using docker-compose for full development
	const url = "mongodb://localhost:27017/booksapi";

	const db = await require("./connection")(url);
	const bookRepository = require("./bookRepository")(db);
	const bookService = require("./bookService")(bookRepository);
	const controller = require("./bookController")({bookService, bookRepository});

	router.get("/", controller.getList);
	router.post("/", controller.createOrUpdate);
	router.get("/:isbn", controller.details);

	return router;
};
