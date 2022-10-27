import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		username: {type: String, required: true, trim: true, text: true},
		account: {type: String, required: true, trim: true, text: true},
		icon: {type: String, trim: true},
		cover: {type: String, trim: true},
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
		planimetry: {
			type: {
				type: mongoose.Schema.Types.Mixed,
			},
		},
	},
	{timestamps: {createdAt: "created_at", updatedAt: "updated_at"}},
);

UserSchema.index(
	{
		username: "text",
		account: "text",
	},
	{
		name: "UserTextIndex",
		default_language: "english",
		weights: {
			username: 10,
			account: 5,
		},
	},
);

export default (mongoose.models.User as any) || (mongoose.model("User", UserSchema) as any);
