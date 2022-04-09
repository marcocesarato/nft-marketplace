const isDev = process.env.NODE_ENV === "development";

export const ChainUrl = isDev ? process.env.CHAIN_TESTNET_URL : process.env.CHAIN_MAINNET_URL;
export const ChainId = isDev ? "0x13881" : "0x89";
