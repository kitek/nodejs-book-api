const assert = require("assert");

describe("Book controller", function() {
  it("should createOrUpdate ends with happy path", async function() {
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
    const bookService = {
      async createOrUpdate(book) {
        this.createOrUpdate.invokedWith = book;
      }
    };
    const bookController = require("../../src/book/bookController")({
      bookService
    });

    // When
    await bookController.createOrUpdate(req, res);

    // Then
    assert.equal(res.redirect.invokedWith, "/book/ISBN");
    assert.deepEqual(bookService.createOrUpdate.invokedWith, { isbn: "ISBN" });
  });

  it("should createOrUpdate ends with unhappy path", async function() {
    // Given
    const error = new Error("Ka-boom!");
    const next = function(e) {
      next.invokedWith = e;
    };
    const bookService = {
      async createOrUpdate(book) {
        throw error;
      }
    };
    const bookController = require("../../src/book/bookController")({
      bookService
    });

    // When
    await bookController.createOrUpdate({}, {}, next);

    // Then
    assert.deepEqual(next.invokedWith, error);
  });
});
