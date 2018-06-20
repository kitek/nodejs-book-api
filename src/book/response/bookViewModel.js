const { bookLink, sortLinks, paginationLink } = require("./links");

module.exports = {
  html({ books, pages, listCriteria, layout }) {
    return {
      books: withLinks(books),
      pages: pagesModel(pages, listCriteria),
      layout: layout,
      sortLinks: sortLinks(listCriteria.sort)
    };
  }
};

function withLinks(books) {
  return books.map(book => ({ ...book, link: bookLink(book.isbn) }));
}

function pagesModel(pages, { sort, sortBy }) {
  return pages.map(({ isCurrent, start }) => ({
    isCurrent,
    humanDisplay: start + 1,
    href: paginationLink({ start, sort, sortBy })
  }));
}
