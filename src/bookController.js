
module.exports = function bookControllerFactory({bookService, bookRepository}) {
    return {
    	async createOrUpdate(req, res, next) {
    		const book = req.body;
    	    try {
                await bookService.createOrUpdate(book);
                res.redirect("/book/" + book.isbn);
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
    };
};
