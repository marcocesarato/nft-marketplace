import logger from "@/logger";
import service from "@/service";
import {dotenvLoad} from "@packages/dotenv";

// Load env
dotenvLoad();

function main() {
	service().catch((error: Error) => {
		logger.error(error.message);
		service(); // Restart service
	});
	process.stdin.resume();
}

function exitHandler(options: any | null | undefined, event: any) {
	// Logging error
	if (options?.tag) logger.warn(`Event ${options.tag}`);
	if (event?.message) logger.error(event.message);
	if (event?.stack) logger.error(event.stack);

	// Exit process
	if (options.exit) {
		logger.warn("Exit");
		process.exit();
	}

	// Restart process
	if (options.restart) {
		logger.info("Restarting service...");
		service();
	}
}

// Catches ctrl+c event
process.on("SIGINT", exitHandler.bind(null, {exit: true, tag: "SIGINT"}));
if (process.platform === "win32") {
	const rl = require("readline").createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	rl.on("SIGINT", exitHandler.bind(null, {exit: true, tag: "SIGINT"}));
}

// Catches "kill pid"
process.on("SIGUSR1", exitHandler.bind(null, {exit: true, tag: "SIGUSR1"}));
process.on("SIGUSR2", exitHandler.bind(null, {exit: true, tag: "SIGUSR2"}));

// Catches uncaught exceptions
process.on("uncaughtException", exitHandler.bind(null, {restart: true, tag: "uncaughtException"}));

main();
