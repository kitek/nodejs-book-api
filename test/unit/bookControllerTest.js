
const assert = require('assert');

const bookService = {
	async createOrUpdate(book) {
		this.createOrUpdate.invokedWith = book;
	}
};
const bookController = require("../../src/bookController")({
	bookService
});

describe('Book controller', function () {
	it('should createOrUpdate ends with happy path', async function () {
		// Given
		const req = {
			body: {
				isbn: "ISBN"
			}
		};
		const res = {
			redirect: function(path) {
				res.redirect.invokedWith = path;
			}
		};
		
		// When
		await bookController.createOrUpdate(req, res);

		// Then
		assert.equal(res.redirect.invokedWith, "/book/ISBN");
		assert.deepEqual(bookService.createOrUpdate.invokedWith, {isbn: "ISBN"})

	});

	it('should createOrUpdate ends with unhappy path', async function () {
		// Given
		const req = {};
		const res = {};
		const next = function(e) {
			next.invokedWith = e;
		}

		// When
		await bookController.createOrUpdate(req, res, next);

		// Then
		assert.ok(next.invokedWith instanceof Error);

	});

});
