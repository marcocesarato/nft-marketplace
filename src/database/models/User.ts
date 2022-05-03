import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		username: {type: String, required: true, trim: true},
		account: {type: String, required: true, trim: true},
		likes: {
			type: [
				{
					type: Number,
					required: true,
					ref: "MarketItem",
				},
			],
			default: [],
		},
		favourites: {
			type: [
				{
					type: Number,
					required: true,
					ref: "MarketItem",
				},
			],
			default: [],
		},
	},
	{timestamps: true},
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
