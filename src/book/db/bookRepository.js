
module.exports = function bookRepositoryFactory(db) {
    const books = db.collection("books");

    return {

        createOrUpdate({title, slug, authors, isbn, description}) {
            return books.updateOne(
                {isbn: isbn},
                {$set : {title, slug, authors, isbn, description} },
                {upsert: true}
            );
        },
        
        findOne(isbn) {
            return books.findOne(
                {isbn},
                { projection: {_id: 0} }
            );
        },
        
        getCount() {
            return books.count();
        },

        findBy({sort, sortBy, start, limit}) {
            return books
                .find()
                .sort({[sortBy]: sort === "asc" ? 1: -1})
                .skip(start * limit)
                .limit(limit)
                .toArray();
        },

        query(q) {
            return books
                .find(
                    {$text: {$search: q}},
                    {_id: 0}
                )
                .limit(10)
                .toArray();
        },

        buildIndex() {
            books.createIndex(
                {title: "text", description: "text", authors: "text"},
                {
                    background: true,
                    weights: {
                        title: 10,
                        description: 1,
                        authors: 3
                    }
                }
            );
        }

    }
}
