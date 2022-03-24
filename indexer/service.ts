import * as ethers from "ethers";

// @ts-ignore
import {MarketAddress} from "../addresses";
import {connectDatabase} from "../src/database/connect";
import MarketItem from "../src/database/models/MarketItem";
import logger from "./logger";
import {createMarketItem, updateMarketItem} from "./mapper";

// @ts-ignore
import MarketContract from "../abis/Market.json";

const EXPECTED_PONG_BACK = 15000;
const KEEP_ALIVE_CHECK_INTERVAL = 7500;

export async function service() {
	logger.info("Service started");
	await connectDatabase();

	logger.info("Connected to database");
	const provider = startConnection();

	// Contract events
	const contract = new ethers.Contract(MarketAddress, MarketContract, provider);
	contract.on("MarketItemCreated", (tokenId, creator, seller, owner, price, sold) => {
		logger.info("Event MarketItemCreated");
		logger.debug("MarketItemCreated", {
			tokenId,
			creator,
			seller,
			owner,
			price,
			sold,
		});
		createMarketItem(contract, tokenId, creator, seller, owner, price, sold);
	});
	contract.on("MarketItemTransaction", (tokenId, seller, owner, sold) => {
		logger.info("Event MarketItemTransaction");
		logger.debug("MarketItemTransaction", {tokenId, seller, owner, sold});
		updateMarketItem(tokenId, seller, owner, sold);
	});

	// History synchronization
	logger.debug("History synchronization started");
	const history = await contract.fetchMarketItems();
	await Promise.all(
		history.map(async (item: any) => {
			MarketItem.findOne({tokenId: item.tokenId}, function (err: Error, existingToken: any) {
				if (err) return logger.error(err);
				if (!existingToken) {
					createMarketItem(
						contract,
						item.tokenId,
						item.creator,
						item.seller,
						item.owner,
						item.price,
						item.sold,
					);
				} else if (
					existingToken.sold !== item.sold ||
					existingToken.owner !== item.owner ||
					existingToken.seller !== item.seller
				) {
					updateMarketItem(item.tokenId, item.seller, item.owner, item.sold);
				}
			});
		}),
	);
	logger.debug("History synchronization finished");
}

const startConnection = () => {
	const provider = new ethers.providers.WebSocketProvider(process.env.CHAIN_TESTNET_WSS || "");

	let pingTimeout: NodeJS.Timeout;
	let keepAliveInterval: NodeJS.Timer;

	provider._websocket.on("open", () => {
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
