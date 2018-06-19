
module.exports = function bookRepositoryFactory(db) {
    const books = db.collection("books");

    return {
        async createOrUpdate({title, slug, authors, isbn, description}) {
            return books.updateOne(
                {isbn: isbn},
                {$set : {title, slug, authors, isbn, description} },
                {upsert: true}
            );
        },
        async findOne(isbn) {
            return books.findOne(
                {isbn},
                { projection: {_id: 0} }
            );
        },
        async getCount() {
            return books.count();
        },
        async findBy({sort, sortBy, start, limit}) {
            return books
                .find()
                .sort({[sortBy]: sort === "asc" ? 1: -1})
                .skip(start * limit)
                .limit(limit)
                .toArray();
        }
    }
}
