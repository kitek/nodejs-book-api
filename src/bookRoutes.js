const {Router} = require('express');
// const url = 'mongodb://db:27017/booksapi'; // when using docker-compose for full development
const url = "mongodb://localhost:27017/booksapi";
const dbFactory = require("./connection");
const bookRepositoryFactory = require("./bookRepository");
const bookServiceFactory = require("./bookService");
const controllerFactory = require("./bookController");

module.exports = async function routerFactory() {
	const router = Router();
	const db = await dbFactory(url);
	const bookRepository = bookRepositoryFactory(db);
	const bookService = bookServiceFactory(bookRepository);
	const controller = controllerFactory({bookService, bookRepository});

	router.get("/", controller.getList);
	router.post("/", controller.createOrUpdate);
	router.get("/:isbn", controller.details);

	return router;
};
