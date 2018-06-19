const makeSlug = require("./makeSlug");

module.exports = function bookServiceFactory(bookRepository) {
    return {
    	createOrUpdate({title, authors, isbn, description}) {
        	const slug = makeSlug(title);
        	return bookRepository.createOrUpdate({title, slug, authors, isbn, description});
    	}
    };
};
