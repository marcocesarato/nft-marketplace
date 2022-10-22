export const ChainId = process.env.NEXT_PUBLIC_CHAIN_ID
	? "0x" + process.env.NEXT_PUBLIC_CHAIN_ID.replace(/^0x/, "").trim()
	: "";
