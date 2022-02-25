## NFT marketplace

### Running this project

#### Local setup

To run this project locally, follow these steps.

1. Clone the project locally, change into the directory, and install the dependencies:

```sh
yarn
```

1. Start the local Hardhat node (only on local environment, for test or main network just follow the [configuration](#Configuration))

```sh
npx hardhat node
```

3. With the network running, deploy the contracts to the local network in a separate terminal window. Change network depends your needs.

```sh
npx hardhat run scripts/deploy.js --network localhost
```

4. Start the app

```
yarn dev
```

### Configuration

#### Moralis

The app is based over Moralis API. Rename `.env.example` to `.env` in the main folder and provide your `appId` and `serverUrl` from Moralis ([How to start Moralis Server](https://docs.moralis.io/moralis-server/getting-started/create-a-moralis-server))

Example:


```env
NEXT_PUBLIC_WORKSPACE_URL=$CLIENT_URL

CHAIN_TESTNET_URL=
CHAIN_MAINNET_URL=
ACCOUNT_PRIVATE=

MORALIS_DEV_SERVER_URL=
MORALIS_DEV_APPLICATION_ID=

MORALIS_SERVER_URL=
MORALIS_APPLICATION_ID=
```

#### Hardhat

To deploy to Polygon test or main networks, update the configurations located in **hardhat.config.js** to use a private key and, optionally, deploy to a private RPC like Moralis (Speedy Notes), Alchemy or Infura.

```javascript
// other code...
module.exports = {
	defaultNetwork: "hardhat",
	networks: {
		hardhat: {
			chainId: 1337,
		},
		mumbai: {
			url: "https://rpc-mumbai.matic.today",
			accounts: [process.env.ACCOUNT_PRIVATE],
		},
		matic: {
			url: "https://rpc-mainnet.maticvigil.com",
			accounts: [process.env.ACCOUNT_PRIVATE],
		},
	},
	solidity: {
		version: "0.8.4",
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
};
```
