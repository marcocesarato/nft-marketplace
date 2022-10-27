import axios from "axios";

import logger from "@/logger";
import {formatUnits, resolveIPFSLink} from "@/utils";
import {MarketItem} from "@packages/mongo";

export async function createMarketItem(
	contract: any,
	{token_id, creator, seller, owner, price, sold}: Item,
) {
	try {
		token_id = token_id.toString();
		logger.debug(`Creating Item #${token_id}`);

		// Retrieve metadata
		const tokenURI = await contract.tokenURI(token_id);
		const tokenURIResolve = resolveIPFSLink(tokenURI);
		if (!tokenURIResolve) {
			logger.warn(`Item #${token_id} tokenURI not found`);
		}
		const fallbackMetadata: ItemMetadata = {
			name: `#${token_id.toString()}`,
			description: "No description.",
			image: "",
		};
		const metadata: ItemMetadata = tokenURIResolve
			? await axios
					.get(tokenURIResolve)
					.then((response) => response.data)
					.catch((err) => {
						logger.error(err.message);
						return fallbackMetadata;
					})
			: fallbackMetadata;
		console.log(tokenURIResolve);
		if (tokenURIResolve && !metadata) {
			logger.warn(`Item #${token_id} metadata not found or empty`);
		}

		// Map attributes
		let attributes = null;
		if (metadata.attributes) {
			attributes = metadata.attributes.map((attribute: any) => {
				return {
					trait_type: attribute.trait_type,
					value: attribute.value,
					display_type: attribute.display_type,
				};
			});
		}

		// Create item
		MarketItem.create(
			{
				_id: token_id,
				token_id: token_id,
				token_uri: tokenURI,
				creator: creator?.toLowerCase(),
				seller: seller?.toLowerCase(),
				owner: owner?.toLowerCase(),
				price: price.toString(),
				price_formatted: formatUnits(price),
				sold: sold,
				name: metadata.name,
				description: metadata.description,
				image: resolveIPFSLink(metadata.image),
				thumbnail: resolveIPFSLink(metadata.thumbnail),
				external_url: metadata.external_url,
				animation_url: metadata.animation_url,
				youtube_url: metadata.youtube_url,
				attributes: attributes,
			} as any,
			function (err: any, item: any) {
				if (err) return logger.error(err.message);
				logger.info(`Created item #${item.token_id}`);
			},
		);
	} catch (err) {
		logger.error(err);
	}
}

export async function updateMarketItem(
	token_id: string,
	{seller, owner, price, sold}: ItemChanges,
) {
	try {
		token_id = token_id.toString();
		logger.debug(`Updating Item #${token_id}`);
		MarketItem.findOne({token_id}, function (err: Error, item: any) {
			if (err) return logger.error(err);
			if (!item) {
				return logger.warn(`No item #${token_id} found`);
			}
			item.seller = seller?.toLowerCase();
			item.owner = owner?.toLowerCase();
			item.price = price.toString();
			item.price_formatted = formatUnits(price);
			item.sold = sold;
			item.save(function (e: Error) {
				if (e) return logger.error(e.message);
				logger.info(`Updated item #${item.token_id}`);
			});
		});
	} catch (err) {
		logger.error(err);
	}
}
