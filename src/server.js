
const App = require("./app");

(async function main() {
	const app = await App();

	app.listen(3000, function () {
	    console.log("Example app listening on port 3000!");
	});
})();
