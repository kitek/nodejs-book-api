module.exports = {
  clientError(req, res, next) {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
  },
  serverError(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500);
    res.json({ message: err.message, error: isProduction() ? {} : err.stack });
  }
};

function isProduction() {
  return process.env.NODE_ENV === "production";
}
