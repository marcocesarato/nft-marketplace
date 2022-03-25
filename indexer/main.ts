import dotenv from "dotenv";

import logger from "./logger";

dotenv.config();
const {service} = require("./service");

if (process.platform === "win32") {
	var rl = require("readline").createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	rl.on("SIGINT", function () {
		process.emit("SIGINT");
	});
}

process.on("SIGINT", function () {
	process.exit(0);
});

service().catch((error: Error) => {
	logger.error(error.message);
	process.exit(1);
});
