import * as ethers from "ethers";
import {connectDatabase, MarketItem} from "@packages/mongo";
import logger from "@/logger";
import {getAddresses, ChainId} from "@/config";
import {createMarketItem, updateMarketItem} from "@/mapper";
import {convertToItem} from "@/utils";

// @ts-ignore
import MarketContract from "@packages/abis/Market.json";

const EXPECTED_PONG_BACK = 15000;
const KEEP_ALIVE_CHECK_INTERVAL = 7500;

export default async function service() {
	logger.info("Service started");
	logger.info(`Connecting to: ${process.env.MONGODB_URI}/${process.env.MONGODB_DATABASE}`);
	await connectDatabase();
	logger.info("Connected to database");

	const provider = startConnection();

	// Contract events
	const {MarketAddress} = getAddresses();
	const contract = new ethers.Contract(MarketAddress, MarketContract, provider);

	contract.on("MarketItemCreated", (token_id, creator, seller, owner_of, price, sold) => {
		logger.info("Event MarketItemCreated");
		const item = {
			network_id: ChainId,
			token_address: MarketAddress,
			token_id,
			price,
			creator,
			seller,
			owner_of,
			sold,
		} as Item;
		logger.debug("MarketItemCreated", item);
		createMarketItem(contract, item);
	});
	contract.on("MarketItemUpdated", (token_id, seller, owner_of, price, sold) => {
		logger.info("Event MarketItemUpdated");
		const changes = {seller, owner_of, price, sold};
		logger.debug("MarketItemUpdated", changes);
		updateMarketItem(token_id, changes);
	});

	// History synchronization
	logger.debug("History synchronization started");
	const history = await (contract.fetchAllMarketItems
		? contract.fetchAllMarketItems
		: contract.fetchMarketItems)();
	await Promise.all(
		history.map(async (contractItem: ContractItem) => {
			const item = convertToItem(contractItem);
			MarketItem.findOne(
				{token_id: item.token_id},
				function (err: Error, existingToken: any) {
					if (err) return logger.error(err.message);
					if (!existingToken) {
						createMarketItem(contract, item);
					} else if (
						existingToken.price.toString() !== item.price.toString() ||
						existingToken.sold !== item.sold ||
						existingToken.owner_of.toLowerCase() !== item.owner_of.toLowerCase() ||
						existingToken.seller.toLowerCase() !== item.seller.toLowerCase()
					) {
						updateMarketItem(item.token_id, item);
					}
				},
			);
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
