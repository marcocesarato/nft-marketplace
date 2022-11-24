import {BigNumberish, ethers} from "ethers";

export function parseEther(value: number | string | undefined): string {
	return ethers.utils.parseEther(String(value)).toString();
}

export function parseUnits(
	value: number | string | undefined,
	unitName: BigNumberish = 18,
): string {
	return ethers.utils.parseUnits(String(value), unitName).toString();
}

export function formatUnits(value: BigNumberish, unitName: BigNumberish = 18): number {
	// formatUnits will always add a trailing 0, remove this as we want to return "1" instead of "1.0"
	const result = ethers.utils.formatUnits(value, unitName);
	const splitResult = result.split(".");
	if (splitResult[1] === "0") {
		return parseFloat(splitResult[0]);
	}

	return parseFloat(result);
}

export function isNumeric(str: string | number): boolean {
	if (typeof str != "string") return false;
	return !isNaN(str as any) && !isNaN(parseFloat(str));
}
