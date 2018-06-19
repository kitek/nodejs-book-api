const {Router} = require("express");
const dbFactory = require("./db/connection");
const bookRepositoryFactory = require("./db/bookRepository");
const bookServiceFactory = require("./domain/bookService");
const controllerFactory = require("./bookController");
const layoutDecorator = require("../layout/layoutDecorator");
const {BOOK, BOOK_COLLECTION, SEARCH, TOP_AUTHORS} = require("./response/links").resources;
const jwt = require('express-jwt');

module.exports = async function routerFactory(config) {
	const router = Router();
	const db = await dbFactory(config.db);
	const bookRepository = bookRepositoryFactory(db);
	const bookService = bookServiceFactory(bookRepository);
	const controller = controllerFactory({bookService, bookRepository});
  const auth = jwt({secret: config.secret});

	router.use(layoutDecorator);
	router.get(BOOK_COLLECTION, controller.getList);
	router.post(BOOK_COLLECTION, auth, controller.createOrUpdate);
	router.get(BOOK, controller.details);
	router.get(SEARCH, controller.search);
	router.get(TOP_AUTHORS, controller.topAuthorsReport);

	bookRepository.buildIndex();

	return router;
};
