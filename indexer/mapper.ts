import axios from "axios";

import MarketItem from "../src/database/models/MarketItem";
import logger from "./logger";
import {resolveIPFSLink} from "./utils";

export async function createMarketItem(
	contract: any,
	tokenId: string,
	creator: string,
	seller: string,
	owner: string,
	price: string,
	sold: boolean,
) {
	try {
		logger.debug(`Creating Item #${tokenId}`);
		const tokenURI = await contract.tokenURI(tokenId);
		const tokenURIResolve = resolveIPFSLink(tokenURI);
		if (!tokenURIResolve) {
			logger.warn(`Item #${tokenId} tokenURI not found`);
		}
		const metadata = tokenURIResolve
			? await axios
					.get(tokenURIResolve)
					.then((response) => response.data)
					.catch((err) => {
						logger.error(err);
						return {};
					})
			: {};
		if (tokenURIResolve && !metadata) {
			logger.warn(`Item #${tokenId} metadata not found or empty`);
		}
		MarketItem.create(
			{
				tokenId: tokenId.toString(),
				tokenURI: tokenURI,
				creator: creator,
				seller: seller,
				owner: owner,
				price: price.toString(),
				sold: sold,
				name: metadata.name || `#${tokenId.toString()}`,
				description: metadata.description || "No description.",
				image: resolveIPFSLink(metadata.image) || "",
				externalUrl: metadata.externalUrl || "",
				attributes: metadata.attributes || [],
			},
			function (err, item) {
				if (err) return logger.error(err);
				logger.info(`Created item #${item.tokenId}`);
			},
		);
	} catch (err) {
		logger.error(err);
	}
}

export async function updateMarketItem(
	tokenId: string,
	seller: string,
	owner: string,
	price: string,
	sold: boolean,
) {
	try {
		logger.debug(`Updating Item #${tokenId}`);
		MarketItem.findOne({tokenId: tokenId}, function (err: Error, item: any) {
			if (err) return logger.error(err);
			if (!item) {
				return logger.warn(`No item #${tokenId} found`);
			}
			item.seller = seller;
			item.owner = owner;
			item.price = price;
			item.sold = sold;
			item.save(function (e: Error) {
				if (e) return logger.error(e);
				logger.info(`Updated item #${item.tokenId}`);
			});
		});
	} catch (err) {
		logger.error(err);
	}
}
