
const bookService = require("./bookService");
const bookRepository = require("./bookRepository");

module.exports = {
	async createOrUpdate(req, res, next) {
		const {title, authors, isbn, description} = req.body;
	    try {
            await bookService.createOrUpdate({title, authors, isbn, description});
            res.redirect("/book/" + isbn);
        } catch (e) {
            next(e);
        }
	},
	async details(req, res, next) {
		try {
            const isbn = req.params.isbn;
            const book = await bookRepository.findOne(isbn);
            res.json(book);
        } catch(e) {
            next(e);
        }
	}
}
