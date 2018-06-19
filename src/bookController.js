const responses = require("./responses");
const userInput = require("./userInput");

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
            const {sort, sortBy, start} = req.query;
            const listCriteria = userInput.sanitizeListCriteria({sort, sortBy, start});
            const {books, pages} = await bookService.getList(listCriteria);

            responses.list({listCriteria, pages, books}, res)
        },

        async search(req, res) {
            const {q} = req.query;
            const books = await bookRepository.query(userInput.sanitizeQuery(q));
    
            responses.list({books}, res);
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
