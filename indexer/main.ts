import dotenv from "dotenv";

import logger from "./logger";

dotenv.config();
const {service} = require("./service");

service().catch((error: Error) => {
	logger.error(error);
	process.exit(1);
});
