mongoimport --mode upsert --host ${DB_HOST} --db ${DB} --collection ${COLLECTION} --type json --file /data/books.import.txt
