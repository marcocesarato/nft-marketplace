import {ethers} from "ethers";

export function parseEther(value) {
	return ethers.utils.parseEther(String(value)).toString();
}

export function parseUnits(value, unitName = 18) {
	return ethers.utils.parseUnits(String(value), unitName).toString();
}

export function formatUnits(value, unitName = 18) {
	// formatUnits will always add a trailing 0, remove this as we want to return "1" instead of "1.0"
	const result = ethers.utils.formatUnits(value, unitName);
	const splitResult = result.split(".");
	if (splitResult[1] === "0") {
		return splitResult[0];
	}

	return result;
}
