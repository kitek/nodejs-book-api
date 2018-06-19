const {bookLink} = require("./links");
const bookViewModel = require("./bookViewModel");

module.exports = {

	createOrUpdate(isbn, res) {
		res.redirect(bookLink(isbn));
	},

	details(book, res, next) {
		if (book) {
            res.format({
                'text/html'() {
                    res.render("book", {book, layout: res.locals.layout});
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
     },

     list({books, pages = [], listCriteria = {}}, res) {
        res.format({
            'text/html'() {
                res.render("books", bookViewModel.html({
                    books, 
                    pages,
                    listCriteria,
                    layout: res.locals.layout
                }));
            },
            'application/json'() {
                res.json(books);
            },
            'default'() {
                res.json(books);
            }
        });
     }

}

