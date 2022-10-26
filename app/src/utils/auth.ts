/*
import {recoverPersonalSignature} from "@metamask/eth-sig-util";
import * as ethUtil from "ethereumjs-util";

export function authSignature(
	message?: string,
	signature?: string,
	publicAddress?: string,
): boolean {
	if (!signature || !publicAddress || !message || !ethUtil.isValidAddress(publicAddress)) {
		return false;
	}

	const msgBufferHex = ethUtil.bufferToHex(Buffer.from(message, "utf8"));
	const address = recoverPersonalSignature({data: msgBufferHex, signature});

	return publicAddress.toLowerCase() === address.toLowerCase();
}
*/
export {};
