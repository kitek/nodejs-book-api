module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/booksapi'
};
