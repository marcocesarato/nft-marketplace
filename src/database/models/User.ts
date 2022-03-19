import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	username: {type: String, required: true},
	account: {type: String, required: true},
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
