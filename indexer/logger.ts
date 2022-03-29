import path from "path";
import winston from "winston";

const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";
const directoryName = path.basename(__dirname);
const logger = winston.createLogger({
	level: "debug",
	transports: [
		new winston.transports.File({
			filename: directoryName + "/logs/error.log",
			level: "error",
			format: winston.format.combine(
				winston.format.timestamp({format: DATE_FORMAT}),
				winston.format.json(),
			),
		}),
		new winston.transports.File({
			filename: directoryName + "/logs/all.log",
			level: "silly",
			format: winston.format.combine(
				winston.format.timestamp({format: DATE_FORMAT}),
				winston.format.json(),
			),
		}),
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize({all: true}),
				winston.format.timestamp({format: DATE_FORMAT}),
				winston.format.printf(({level, message, timestamp}) => {
					return `[${timestamp}] [${level}] ${message}`;
				}),
			),
		}),
	],
});

export default logger;
