export function getAddresses(): ContractAddresses {
	let addresses: ContractAddresses = {MarketAddress: "0x"};
	try {
		addresses = JSON.parse(process.env.NEXT_PUBLIC_CHAIN_ADDRESSES);
		if (!addresses.MarketAddress) {
			console.error("Invalid NEXT_PUBLIC_CHAIN_ADDRESSES.MarketAddress environment variable");
			process.exit(1);
		}
	} catch (e) {
		console.error("Can't parse chain contract addresses", e.message);
		process.exit(1);
	}
	return addresses;
}

export const ChainId = Number(
	process.env.NEXT_PUBLIC_CHAIN_ID ? process.env.NEXT_PUBLIC_CHAIN_ID : 0,
);
