const {createServer} = require("https");
const {parse} = require("url");
const next = require("next");

const hostname = "localhost";
const port = 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({dev, port, hostname});
const handle = app.getRequestHandler();

const httpsOptions = {
	key: process.env.SSL_KEY,
	cert: process.env.SSL_CERT,
};

app.prepare().then(() => {
	createServer(httpsOptions, (req, res) => {
		const parsedUrl = parse(req.url, true);
		handle(req, res, parsedUrl);
	}).listen(port, (err) => {
		if (err) throw err;
		console.log("ready - started server on url: https://localhost:" + port);
	});
});
