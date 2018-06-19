
const router = require('express').Router();
const bookService = require("./bookService");
const bookRepository = require("./bookRepository");

const controller = require("./bookController")({bookService, bookRepository});

router.get("/", controller.getList);
router.post("/", controller.createOrUpdate);
router.get("/:isbn", controller.details);

module.exports = router;
