require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("@openzeppelin/hardhat-upgrades");
require("hardhat-gas-reporter");
require("dotenv-mono").load();

module.exports = {
	defaultNetwork: "hardhat",
	networks: {
		hardhat: {
			chainId: 1337,
		},
		mumbai: {
			chainId: 80001,
			url: process.env.CHAIN_TESTNET_URL,
			accounts: [process.env.ACCOUNT_PRIVATE],
		},
		matic: {
			url: process.env.CHAIN_MAINNET_URL,
			accounts: [process.env.ACCOUNT_PRIVATE],
		},
	},
	gasReporter: {
		enabled: process.env.REPORT_GAS !== undefined,
		currency: "USD",
	},
	solidity: {
		version: "0.8.9",
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
};
