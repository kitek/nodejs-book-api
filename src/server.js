
const App = require("./app");
const config = require("./config");

(async function main() {
	const app = await App(config);

	app.listen(config.port, function () {
	    console.log(`Example app listening on port ${config.port}!`);
	});
})();
