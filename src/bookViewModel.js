const {bookLink, sortLinks} = require("./links");

module.exports = {
	html({books, listCriteria, layout}) {
		return { 
            books: withLinks(books), 
            layout: layout,
            sortLinks: sortLinks(listCriteria.sort)
        };
	}
};

function withLinks(books) {
    return books.map(book => ({...book, link: bookLink(book.isbn)} ));
}
