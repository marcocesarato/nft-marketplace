import mongoose, {Mongoose} from "mongoose";

// Models
export * from "./models";

// Connect
const cached: {
	conn?: Mongoose;
	promise?: Promise<Mongoose>;
} = {};
export async function connectDatabase(): Promise<Mongoose> {
	// Credentials
	const MONGODB_URI = process.env.MONGODB_URI;
	const MONGODB_DATABASE = process.env.MONGODB_DATABASE;
	if (!MONGODB_URI || !MONGODB_DATABASE) {
		throw new Error("Please define the MONGODB_URI and MONGODB_DATABASE environment variable");
	}

	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			auth: {
				username: process.env.MONGODB_ROOT_USERNAME,
				password: process.env.MONGODB_ROOT_PASSWORD,
			},
			authSource: "admin",
			useNewUrlParser: true,
			useUnifiedTopology: true,
			bufferCommands: false,
		};

		mongoose.set("strictQuery", true);
		cached.promise = mongoose.connect(`${MONGODB_URI}/${MONGODB_DATABASE}`, opts);
	}
	cached.conn = await cached.promise;
	return cached.conn;
}
