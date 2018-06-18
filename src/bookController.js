
module.exports = function bookControllerFactory({bookService, bookRepository}) {
    return withErrorHandling({
    	async createOrUpdate(req, res, next) {
            const book = req.body;
            await bookService.createOrUpdate(book);
            res.redirect("/book/" + book.isbn);
    	},
    	async details(req, res, next) {

            const isbn = req.params.isbn;
            const book = await bookRepository.findOne(isbn);

             if (book) {
                res.format({
                    'text/html'() {
                        res.render("book", {book});
                    },
                    'application/json'() {
                        res.json(book);
                    },
                    'default'() {
                        res.json(book);
                    }
                });
             } else {
                next();
             }

    	}
    });
};

function withErrorHandling(api) {
    const apiWithErrorHandling = {};
    Object.keys(api).forEach(function(key) {
        const originalFn = api[key];
        apiWithErrorHandling[key] = wrapWithTryCatch(originalFn);
    });
    return apiWithErrorHandling;
}

function wrapWithTryCatch(fn) {
    return async function(req, res, next) {
        try {
            return await fn(req, res, next);
        } catch(e) {
            next(e);
        }
    }
}
