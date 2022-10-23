import Market from "@packages/abis/Market.json";

let addresses: {MarketAddress: string} = {MarketAddress: "0x"};
try {
	addresses = JSON.parse(process.env.NEXT_PUBLIC_CHAIN_ADDRESSES) || addresses;
} catch (e) {
	console.error("Can't parse chain contract addresses", e.message);
	process.exit();
}

export const MarketAddress = addresses.MarketAddress;
export const MarketContract = Market;
