import path from "path";
import winston from "winston";

const directoryName = path.basename(__dirname);
const logger = winston.createLogger({
	level: "debug",
	transports: [
		new winston.transports.File({
			filename: directoryName + "/logs/error.log",
			level: "error",
			format: winston.format.json(),
		}),
		new winston.transports.File({
			filename: directoryName + "/logs/all.log",
			format: winston.format.json(),
		}),
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize({all: true}),
				winston.format.timestamp({format: "DD/MM/YYYY HH:mm:ss"}),
				winston.format.align(),
				winston.format.printf(({level, message, timestamp}) => {
					return `[${timestamp}] [${level}] ${message}`;
				}),
			),
		}),
	],
});

export default logger;
