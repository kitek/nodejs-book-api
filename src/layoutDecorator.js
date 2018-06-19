module.exports = function layoutDecorator(req, res, next) {
	const nolayout = req.query.nolayout;
    const layout = nolayout == null ? "layout" : "";
    res.locals.layout = layout;

    next();
};
