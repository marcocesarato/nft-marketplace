import mongoose from "mongoose";

const MarketItemSchema = new mongoose.Schema(
	{
		_id: {type: Number, required: true},
		token_address: {type: String, required: true, trim: true},
		token_id: {type: Number, required: true, trim: true},
		token_uri: {type: String, required: true, trim: true},
		creator: {type: String, required: true, trim: true},
		seller: {type: String, required: true, trim: true},
		owner_of: {type: String, required: true, trim: true},
		price: {type: String, required: true, trim: true},
		price_formatted: {type: String, trim: true},
		sold: {type: Boolean, required: true},
		name: {type: String, required: true, trim: true, text: true},
		description: {type: String, required: true, trim: true, text: true},
		image: {type: String, required: true, trim: true},
		thumbnail: {type: String, trim: true},
		external_url: {type: String, trim: true},
		animation_url: {type: String, trim: true},
		youtube_url: {type: String, trim: true},
		attributes: {
			type: [
				{
					trait_type: {type: String, required: true, trim: true},
					value: {type: String, required: true, trim: true},
					display_type: {type: String, trim: true},
				},
			],
		},
		likes: {type: Number, default: 0},
	},
	{timestamps: {createdAt: "created_at", updatedAt: "updated_at"}},
);

MarketItemSchema.index(
	{
		name: "text",
		description: "text",
	},
	{
		name: "MarketItemTextIndex",
		default_language: "english",
		weights: {
			name: 10,
			description: 5,
		},
	},
);

export default (mongoose.models.MarketItem as any) ||
	(mongoose.model("MarketItem", MarketItemSchema) as any);
