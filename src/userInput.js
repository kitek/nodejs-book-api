module.exports = {
    sanitizeListCriteria({sort, sortBy}) {
        const sortNormalized = (sort !== "desc" && sort !== "asc") ? "asc" : sort;
        const sortByNormalized = sortBy !== "title" ? "_id" : "title";

        return {sort: sortNormalized, sortBy: sortByNormalized};
    }
};
