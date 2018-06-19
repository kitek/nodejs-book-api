
const responses = require("./responses.js");

module.exports = function bookControllerFactory({bookService, bookRepository}) {
    return withErrorHandling({

    	async createOrUpdate(req, res, next) {
            const book = req.body;
            await bookService.createOrUpdate(book);

            responses.createOrUpdate(book.isbn, res);
    	},

    	async details(req, res, next) {
            const isbn = req.params.isbn;
            const book = await bookRepository.findOne(isbn);

            responses.details(book, res, next);
    	},

        async getList(req, res) {
            const {sort, sortBy} = req.query;
            const listCriteria = {sort, sortBy}
            const books = await bookRepository.findBy(listCriteria);

            responses.list(books, res)
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
