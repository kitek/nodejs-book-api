
const App = require("./app");
const config = require("./config");
const jwt = require('express-jwt');
const auth = jwt({secret: config.secret});

(async function main() {
	const app = await App({config, auth});

	app.listen(config.port, function () {
	    console.log(`Example app listening on port ${config.port}!`);
	});
})();
