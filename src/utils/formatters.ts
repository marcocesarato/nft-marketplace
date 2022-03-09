export const formatAddress = (address, max = 6) =>
	address && `${address.slice(0, max)}...${address.slice(address.length - 4, address.length)}`;
