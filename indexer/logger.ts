import winston from "winston";

import "winston-daily-rotate-file";

const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";

const errorDailyTransport = new winston.transports.DailyRotateFile({
	filename: __dirname + "/errors/error-%DATE%.log",
	level: "error",
	format: winston.format.combine(
		winston.format.timestamp({format: DATE_FORMAT}),
		winston.format.json(),
	),
	frequency: "1d",
});
const allDaylyTransport = new winston.transports.DailyRotateFile({
	filename: __dirname + "/logs/logs-%DATE%.log",
	level: "silly",
	format: winston.format.combine(
		winston.format.timestamp({format: DATE_FORMAT}),
		winston.format.json(),
	),
	frequency: "1d",
});
const logger = winston.createLogger({
	level: "debug",
	transports: [
		errorDailyTransport,
		allDaylyTransport,
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
