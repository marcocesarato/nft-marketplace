import mongoose from "mongoose";

const MarketItemSchema = new mongoose.Schema(
	{
		_id: {type: Number, required: true},
		tokenId: {type: Number, required: true, trim: true},
		tokenURI: {type: String, required: true, trim: true},
		creator: {type: String, required: true, trim: true},
		seller: {type: String, required: true, trim: true},
		owner: {type: String, required: true, trim: true},
		price: {type: String, required: true, trim: true},
		sold: {type: Boolean, required: true},
		name: {type: String, required: true, trim: true},
		description: {type: String, required: true, trim: true},
		image: {type: String, required: true, trim: true},
		thumbnail: {type: String, trim: true},
		externalUrl: {type: String, trim: true},
		animationUrl: {type: String, trim: true},
		youtubeUrl: {type: String, trim: true},
		attributes: {
			type: [
				{
					traitType: {type: String, required: true, trim: true},
					value: {type: String, required: true, trim: true},
					displayType: {type: String, trim: true},
				},
			],
		},
		likes: {type: Number, default: 0},
	},
	{timestamps: true},
);

export default mongoose.models.MarketItem || mongoose.model("MarketItem", MarketItemSchema);
