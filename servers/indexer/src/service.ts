// @ts-ignore
import {MarketAddress} from "@root/addresses";
import * as ethers from "ethers";
import {connectDatabase, MarketItem} from "@packages/database";
import logger from "@/logger";
// @ts-ignore
import MarketContract from "@packages/abis/Market.json";

import {createMarketItem, updateMarketItem} from "./mapper";

const EXPECTED_PONG_BACK = 15000;
const KEEP_ALIVE_CHECK_INTERVAL = 7500;

export default async function service() {
	logger.info("Service started");
	logger.info(`Connecting to: ${process.env.MONGODB_URI}/${process.env.MONGODB_DATABASE}`);
	await connectDatabase();
	logger.info("Connected to database");

	const provider = startConnection();

	// Contract events
	const contract = new ethers.Contract(MarketAddress, MarketContract, provider);
	contract.on("MarketItemCreated", (tokenId, creator, seller, owner, price, sold) => {
		logger.info("Event MarketItemCreated");
		const item = {
			tokenId: tokenId.toString(),
			creator,
			seller,
			owner,
			price: price.toString(),
			sold,
		};
		logger.debug("MarketItemCreated", item);
		createMarketItem(contract, item);
	});
	contract.on("MarketItemUpdated", (tokenId, seller, owner, price, sold) => {
		logger.info("Event MarketItemUpdated");
		const changes = {seller, owner, price, sold};
		logger.debug("MarketItemUpdated", changes);
		updateMarketItem(tokenId, changes);
	});

	// History synchronization
	logger.debug("History synchronization started");
	const history = await contract.fetchMarketItems();
	await Promise.all(
		history.map(async (item: Item) => {
			MarketItem.findOne({tokenId: item.tokenId}, function (err: Error, existingToken: any) {
				if (err) return logger.error(err);
				if (!existingToken) {
					createMarketItem(contract, item);
				} else if (
					existingToken.price.toString() !== item.price.toString() ||
					existingToken.sold !== item.sold ||
					existingToken.owner.toLowerCase() !== item.owner.toLowerCase() ||
					existingToken.seller.toLowerCase() !== item.seller.toLowerCase()
				) {
					updateMarketItem(item.tokenId, item);
				}
			});
		}),
	);
	logger.debug("History synchronization finished");
}

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

const startConnection = () => {
	const provider = new ethers.providers.WebSocketProvider(
		(isDev ? process.env.CHAIN_TESTNET_WSS : process.env.CHAIN_MAINNET_WSS) || "",
	);

	let pingTimeout: NodeJS.Timeout;
	let keepAliveInterval: NodeJS.Timer;

	logger.info("Start websocket connection");

	provider._websocket.on("open", () => {
		logger.info("The websocket opened the connection");
		keepAliveInterval = setInterval(() => {
			//logger.debug("Checking if the connection is alive, sending a ping");
			provider._websocket.ping();
			// Use `WebSocket#terminate()`, which immediately destroys the connection,
			// instead of `WebSocket#close()`, which waits for the close timer.
			// Delay should be equal to the interval at which your server
			// sends out pings plus a conservative assumption of the latency.
			pingTimeout = setTimeout(() => {
				provider._websocket.terminate();
			}, EXPECTED_PONG_BACK);
		}, KEEP_ALIVE_CHECK_INTERVAL);
	});

	provider._websocket.on("close", () => {
		logger.error("The websocket connection was closed");
		clearInterval(keepAliveInterval);
		clearTimeout(pingTimeout);
		startConnection();
	});

	provider._websocket.on("pong", () => {
		//logger.debug("Received pong, connection is alive");
		clearInterval(pingTimeout);
	});

	return provider;
};
