require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
	defaultNetwork: "hardhat",
	networks: {
		hardhat: {
			chainId: 1337,
		},
		mumbai: {
			url: process.env.CHAIN_TESTNET_URL,
			accounts: [process.env.ACCOUNT_PRIVATE],
		},
		matic: {
			url: process.env.CHAIN_MAINNET_URL,
			accounts: [process.env.ACCOUNT_PRIVATE],
		},
	},
	solidity: {
		version: "0.8.7",
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
};
