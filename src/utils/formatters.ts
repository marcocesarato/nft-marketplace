import {getLocale} from "./date";

export const formatAddress = (address, max = 6) =>
	address && `${address.slice(0, max)}...${address.slice(address.length - 4, address.length)}`;

export const formatDate = (date) => {
	const d = new Date(date);
	return d.toLocaleDateString(getLocale(), {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};
