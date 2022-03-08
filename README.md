# NFT Marketplace

## Index

- [NFT Marketplace](#nft-marketplace)
  - [Index](#index)
  - [Setup](#setup)
    - [Local Setup](#local-setup)
    - [Using Docker](#using-docker)
    - [Deploying to Google Cloud Run](#deploying-to-google-cloud-run)
  - [Configuration](#configuration)
    - [Requirements](#requirements)
    - [Configure Moralis](#configure-moralis)
    - [Configure Hardhat](#configure-hardhat)
  - [Project Structure](#project-structure)
  - [Technology Stack](#technology-stack)
  - [Conding Style](#conding-style)
  - [How Contribute](#how-contribute)

## Setup

### Local Setup

To run this project locally, follow these steps.

1. Clone the project locally, change into the directory

2. Install the dependencies (`yarn` suggested):

    ```sh
    yarn
    # or
    npm install
    ```

3. Start the local Hardhat node (**optional** on local environment, for test or main network just follow the [configuration](#configuration))

    ```sh
    npx hardhat node
    ```

4. With the network running, deploy the contracts to the local network in a separate terminal window. Change network depends your needs. (**optional** only if contracts never been deployed before)

    ```sh
    npx hardhat run scripts/deploy.js --network localhost
    ```

5. Start the app

    ```sh
    yarn dev
    # or
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Using Docker

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
1. Build your container: `docker build -t nft-marketplace .`.
1. Run your container: `docker run -p 3000:3000 nft-marketplace`.

You can view your images created with `docker images`.

### Deploying to Google Cloud Run

1. Install the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) so you can use `gcloud` on the command line.
1. Run `gcloud auth login` to log in to your account.
1. [Create a new project](https://cloud.google.com/run/docs/quickstarts/build-and-deploy) in Google Cloud Run (e.g. `nft-marketplace`). Ensure billing is turned on.
1. Build your container image using Cloud Build: `gcloud builds submit --tag gcr.io/PROJECT-ID/nft-marketplace --project PROJECT-ID`. This will also enable Cloud Build for your project.
1. Deploy to Cloud Run: `gcloud run deploy --image gcr.io/PROJECT-ID/nft-marketplace --project PROJECT-ID --platform managed`. Choose a region of your choice.

   - You will be prompted for the service name: press Enter to accept the default name, `nft-marketplace`.
   - You will be prompted for [region](https://cloud.google.com/run/docs/quickstarts/build-and-deploy#follow-cloud-run): select the region of your choice, for example `us-central1`.
   - You will be prompted to **allow unauthenticated invocations**: respond `y`.

## Configuration

### Requirements

- Moralis ([Sign Up](https://moralis.io/))

### Configure Moralis

The project is based over Moralis API (but it's functionality is code wrapped to permit to be replaced based on furure needs). Rename `.env.example` to `.env` in the main folder and provide your `appId` and `serverUrl` from Moralis ([How to start Moralis Server](https://docs.moralis.io/moralis-server/getting-started/create-a-moralis-server))

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

### Configure Hardhat

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

## Project Structure

The project uses NextJS and the source code is mostly contained within the `src` path.
The pages (and the routing) are contained within the `src/pages` and API for backend services on `src/pages/api`.

The `contracts` directory contains all the smart contracts (made with [Solidity](https://docs.soliditylang.org/)) to be deployed on the blockchain and make the project work.

## Technology Stack

- [React](https://reactjs.org/)
- [NextJS](https://nextjs.org/) (with [Static Export](https://nextjs.org/docs/advanced-features/static-html-export))
- [React Query](https://react-query.tanstack.com/)
- [React Error Boundary](https://github.com/bvaughn/react-error-boundary)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [React Three XR](https://github.com/pmndrs/react-xr)
- [React Moralis](https://github.com/MoralisWeb3/react-moralis)
- [Chakra UI](https://chakra-ui.com/)
- [Axios](https://github.com/axios/axios)
- [ThreeJS](https://threejs.org/)
- [WebXR](https://immersive-web.github.io/)
- [Web3](https://web3js.readthedocs.io/en/v1.7.0/)
- [Hardhat](https://hardhat.org/)
- [Solidity](https://docs.soliditylang.org/)
- [IPFS](https://ipfs.io/)
- [Ethers](https://github.com/ethers-io/ethers.js)
- [Ethereum/Polygon Blockchain](https://www.polygon.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

## Conding Style

Follow the guide lines [HERE](./CODING_STYLE.md)

## How Contribute

Follow the guide lines [HERE](./CONTRIBUTING.md)
