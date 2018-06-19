
module.exports = {

	createOrUpdate(isbn, res) {
		res.redirect("/book/" + isbn);
	},

	details({book, layout}, res, next) {
		if (book) {
            res.format({
                'text/html'() {
                    res.render("book", {book, layout});
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

     list(books, res) {
        res.format({
            'text/html'() {
                res.render("books", {books});
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
