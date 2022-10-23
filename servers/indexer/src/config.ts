export function getAddresses(): ContractAddresses {
	let addresses: ContractAddresses = {MarketAddress: "0x"};
	try {
		addresses = JSON.parse(process.env.NEXT_PUBLIC_CHAIN_ADDRESSES) || addresses;
	} catch (e) {
		console.warn("Can't parse chain contract addresses");
	}
	return addresses;
}
