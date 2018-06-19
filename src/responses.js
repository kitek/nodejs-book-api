
module.exports = {

	details: function({book, layout}, res, next) {
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
     }
     
}
