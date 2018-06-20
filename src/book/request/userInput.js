module.exports = {
  sanitizeListCriteria({ sort, sortBy, start }) {
    const sortNormalized = sort !== "desc" && sort !== "asc" ? "asc" : sort;
    const sortByNormalized = sortBy !== "title" ? "_id" : "title";
    const startNormalized =
      Number.isInteger(Number(start)) && start >= 0 ? Number(start) : 0;
    const limit = 10;

    return {
      sort: sortNormalized,
      sortBy: sortByNormalized,
      start: startNormalized,
      limit
    };
  },
  sanitizeQuery(query) {
    if (!query || typeof query !== "string") return "";
    return query.trim().substring(0, 32);
  }
};
