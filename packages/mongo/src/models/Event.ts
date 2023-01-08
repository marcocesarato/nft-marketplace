import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
	{
		_id: {type: Number, required: true},
		name: {type: String, required: true, trim: true, text: true},
		description: {type: String, required: true, trim: true, text: true},
		starts_at: {type: Date, required: true},
		ends_at: {type: Date, required: true},
		participants: {
			type: [
				{
					type: Number,
					required: true,
					ref: "User",
				},
			],
			default: [],
		},
		access_token: {type: String, trim: true}, // If not null a NFT is required to access
	},
	{timestamps: {createdAt: "created_at", updatedAt: "updated_at"}},
);

EventSchema.index(
	{
		name: "text",
		description: "text",
	},
	{
		name: "EventTextIndex",
		default_language: "english",
		weights: {
			name: 10,
			description: 5,
		},
	},
);

export default (mongoose.models.Event as any) || (mongoose.model("Event", EventSchema) as any);
