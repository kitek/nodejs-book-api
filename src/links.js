const qs = require("querystring");

const links = {
	resources: {
		BOOK: "/book/:isbn",
		BOOK_COLLECTION: "/book"
	},
	bookLink(isbn) {
		return links.resources.BOOK.replace(":isbn", isbn);
	},
	sortLinks(sort) {
		return {
			sortById: link(links.resources.BOOK_COLLECTION, {sortBy: "id", sort: reverse(sort)}),
            sortByTitle: link(links.resources.BOOK_COLLECTION, {sortBy: "title", sort: reverse(sort)})
		};
	}
};

function link(path, queryParams) {
    return path + "?" + qs.stringify(queryParams)
}

function reverse(sort) {
    return sort === "desc" ? "asc" : "desc";
}

module.exports = links;

