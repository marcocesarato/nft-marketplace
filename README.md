# NFT marketplace

## Running this project

### Local setup

To run this project locally, follow these steps.

1. Clone the project locally, change into the directory, and install the dependencies:

    ```sh
    yarn
    ```

2. Start the local Hardhat node (only on local environment, for test or main network just follow the [configuration](#Configuration))

    ```sh
    npx hardhat node
    ```

3. With the network running, deploy the contracts to the local network in a separate terminal window. Change network depends your needs.

    ```sh
    npx hardhat run scripts/deploy.js --network localhost
    ```

4. Start the app

    ```sh
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration

#### Requirements

- Moralis ([Sign Up](https://moralis.io/))

#### Moralis

The app is based over Moralis API. Rename `.env.example` to `.env` in the main folder and provide your `appId` and `serverUrl` from Moralis ([How to start Moralis Server](https://docs.moralis.io/moralis-server/getting-started/create-a-moralis-server))

Example:

```env
NEXT_PUBLIC_WORKSPACE_URL=$CLIENT_URL

CHAIN_TESTNET_URL=
CHAIN_MAINNET_URL=
ACCOUNT_PRIVATE=

# Works on local/dev environment
MORALIS_DEV_SERVER_URL=
MORALIS_DEV_APPLICATION_ID=

# Works on production environment
MORALIS_SERVER_URL=
MORALIS_APPLICATION_ID=
```

#### Hardhat

To deploy to Polygon test or main networks, update the configurations located in **hardhat.config.js** to use a private key and, optionally, deploy to a private RPC like Moralis (Speedy Notes), Alchemy or Infura.

```js
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

## Using Docker

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
1. Build your container: `docker build -t nft-marketplace .`.
1. Run your container: `docker run -p 3000:3000 nft-marketplace`.

You can view your images created with `docker images`.

## Deploying to Google Cloud Run

1. Install the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) so you can use `gcloud` on the command line.
1. Run `gcloud auth login` to log in to your account.
1. [Create a new project](https://cloud.google.com/run/docs/quickstarts/build-and-deploy) in Google Cloud Run (e.g. `nft-marketplace`). Ensure billing is turned on.
1. Build your container image using Cloud Build: `gcloud builds submit --tag gcr.io/PROJECT-ID/nft-marketplace --project PROJECT-ID`. This will also enable Cloud Build for your project.
1. Deploy to Cloud Run: `gcloud run deploy --image gcr.io/PROJECT-ID/nft-marketplace --project PROJECT-ID --platform managed`. Choose a region of your choice.

   - You will be prompted for the service name: press Enter to accept the default name, `nft-marketplace`.
   - You will be prompted for [region](https://cloud.google.com/run/docs/quickstarts/build-and-deploy#follow-cloud-run): select the region of your choice, for example `us-central1`.
   - You will be prompted to **allow unauthenticated invocations**: respond `y`.
