const isDev = process.env.NODE_ENV === "development";

export const moralisAppId = isDev
	? process.env.MORALIS_DEV_APPLICATION_ID
	: process.env.MORALIS_APPLICATION_ID;
export const moralisServerUrl = isDev
	? process.env.MORALIS_DEV_SERVER_URL
	: process.env.MORALIS_SERVER_URL;
