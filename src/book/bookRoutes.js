const {Router} = require("express");
const dbFactory = require("./db/connection");
const bookRepositoryFactory = require("./db/bookRepository");
const bookServiceFactory = require("./domain/bookService");
const controllerFactory = require("./bookController");
const layoutDecorator = require("../layout/layoutDecorator");
const {BOOK, BOOK_COLLECTION, SEARCH} = require("./response/links").resources;

module.exports = async function routerFactory(config) {
	const router = Router();
	const db = await dbFactory(config.db);
	const bookRepository = bookRepositoryFactory(db);
	const bookService = bookServiceFactory(bookRepository);
	const controller = controllerFactory({bookService, bookRepository});

	router.use(layoutDecorator);
	router.get(BOOK_COLLECTION, controller.getList);
	router.post(BOOK_COLLECTION, controller.createOrUpdate);
	router.get(BOOK, controller.details);
	router.get(SEARCH, controller.search);

	bookRepository.buildIndex();

	return router;
};
