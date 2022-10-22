import axios from "axios";

import logger from "@/logger";
import { resolveIPFSLink } from "@/utils";
import MarketItem from "@models/MarketItem";

export async function createMarketItem(
    contract: any,
    { tokenId, creator, seller, owner, price, sold }: Item
) {
    try {
        logger.debug(`Creating Item #${tokenId}`);

        // Retrieve metadata
        const tokenURI = await contract.tokenURI(tokenId);
        const tokenURIResolve = resolveIPFSLink(tokenURI);
        if (!tokenURIResolve) {
            logger.warn(`Item #${tokenId} tokenURI not found`);
        }
        const fallbackMetadata: ItemMetadata = {
            name: `#${tokenId.toString()}`,
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
        if (tokenURIResolve && !metadata) {
            logger.warn(`Item #${tokenId} metadata not found or empty`);
        }

        // Map attributes
        let attributes = null;
        if (metadata.attributes) {
            attributes = metadata.attributes.map((attribute: any) => {
                return {
                    traitType: attribute.trait_type,
                    value: attribute.value,
                    displayType: attribute.display_type,
                };
            });
        }

        // Create item
        MarketItem.create(
            {
                _id: tokenId,
                tokenId: tokenId,
                tokenURI: tokenURI,
                creator: creator?.toLowerCase(),
                seller: seller?.toLowerCase(),
                owner: owner?.toLowerCase(),
                price: price,
                sold: sold,
                name: metadata.name,
                description: metadata.description,
                image: resolveIPFSLink(metadata.image),
                thumbnail: resolveIPFSLink(metadata.thumbnail),
                externalUrl: metadata.external_url,
                animationUrl: metadata.animation_url,
                youtubeUrl: metadata.youtube_url,
                attributes: attributes,
            } as any,
            function (err: any, item: any) {
                if (err) return logger.error(err.message);
                logger.info(`Created item #${item.tokenId}`);
            }
        );
    } catch (err) {
        logger.error(err);
    }
}

export async function updateMarketItem(
    tokenId: string,
    { seller, owner, price, sold }: ItemChanges
) {
    try {
        logger.debug(`Updating Item #${tokenId}`);
        MarketItem.findOne(
            { tokenId: tokenId },
            function (err: Error, item: any) {
                if (err) return logger.error(err);
                if (!item) {
                    return logger.warn(`No item #${tokenId} found`);
                }
                item.seller = seller?.toLowerCase();
                item.owner = owner?.toLowerCase();
                item.price = price;
                item.sold = sold;
                item.save(function (e: Error) {
                    if (e) return logger.error(e.message);
                    logger.info(`Updated item #${item.tokenId}`);
                });
            }
        );
    } catch (err) {
        logger.error(err);
    }
}
