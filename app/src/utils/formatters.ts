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

const units = ["k", "m", "b", "t"];

export function toPrecision(number: number, precision: number = 1) {
	return number
		.toString()
		.replace(new RegExp(`(.+\\.\\d{${precision}})\\d+`), "$1")
		.replace(/(\.[1-9]*)0+$/, "$1")
		.replace(/\.$/, "");
}

export function formatBalance(number: number): string {
	if (number < 1) return toPrecision(number, 3);
	if (number < 10 ** 2) return toPrecision(number, 2);
	if (number < 10 ** 4) return new Intl.NumberFormat().format(parseFloat(toPrecision(number, 1)));

	const decimalsDivisor = 10 ** 1; // 1 decimal place

	let result = String(number);

	for (let i = units.length - 1; i >= 0; i--) {
		const size = 10 ** ((i + 1) * 3);

		if (size <= number) {
			number = (number * decimalsDivisor) / size / decimalsDivisor;

			result = toPrecision(number, 1) + units[i];

			break;
		}
	}

	return result;
}

export function slug(s: string) {
	return s
		.toString()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/&/g, "-and-")
		.replace(/[^\w-]+/g, "")
		.replace(/--+/g, "-")
		.replace(/^-+/, "")
		.replace(/-+$/, "");
}
