const {bookLink} = require("./links");

module.exports = {
	html({books, layout}) {
		return { 
            books: withLinks(books), 
            layout: layout
        };
	}
};

function withLinks(books) {
    return books.map(book => ({...book, link: bookLink(book.isbn)} ));
}
