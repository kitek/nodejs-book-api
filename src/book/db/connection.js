const MongoClient = require("mongodb").MongoClient;

module.exports = async function(url) {
	const dbConnection = await MongoClient.connect(url, {
		bufferMaxEntries: 0
	});
	return dbConnection.db();
}
