require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("@openzeppelin/hardhat-upgrades");
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
		version: "0.8.12",
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
};
