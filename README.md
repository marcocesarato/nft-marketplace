# NFT Marketplace

## Summary

- [Summary](#summary)
- [Setup](#setup)
    - [Local Setup](#local-setup)
    - [Configuration](#configuration)
        - [Configure Moralis and Hardhat](#configure-moralis-and-hardhat)
    - [Using Docker](#using-docker)
    - [Deploying to Google Cloud Run](#deploying-to-google-cloud-run)
- [Requirements](#requirements)
    - [Background information](#background-information)
        - [Fungible vs. non-fungible](#fungible-vs-non-fungible)
        - [Blockchain](#blockchain)
        - [Minting ERC721 tokens](#minting-erc721-tokens)
        - [Smart contracts and NFTs](#smart-contracts-and-nfts)
        - [Public networks: Mainnet vs. Testnet](#public-networks-mainnet-vs-testnet)
        - [Private networks](#private-networks)
        - [Faucets](#faucets)
        - [Nodes and clients](#nodes-and-clients)
- [Technology Stack](#technology-stack)
    - [Main](#main)
    - [Libraries](#libraries)
- [Project Structure](#project-structure)
- [Coding style](#coding-style)
- [How to contribute](#how-to-contribute)

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


### Configuration

#### Configure Moralis and Hardhat

The project is based over Moralis API (but it's functionality is code wrapped to permit to be replaced based on furure needs). Rename `.env.example` to `.env` in the main folder and provide your `appId` and `serverUrl` from Moralis ([How to start Moralis Server](https://docs.moralis.io/moralis-server/getting-started/create-a-moralis-server)).

To deploy to Polygon test or main networks we need to configure hardhat so we need to get the WebSocket and JSON RPC url from Moralis. Once you log into your account, go to the "Speedy Nodes" section. Click on the "Endpoints" button for the Network you need to configure. You will see separate URLs for each network and each archive version.

> PS: Moralis closes your server every 7 days, so if you have problems with API calls the server is probably down and you need to remember that you need to restart the server.

**Example `.env` file:**

```env
NEXT_PUBLIC_WORKSPACE_URL=$CLIENT_URL

# MongoDB
MONGODB_URI=mongodb://mongo:27017/

# WebSocket and JSON RPC
CHAIN_TESTNET_URL=
CHAIN_MAINNET_URL=

# Private account key for signing transactions
ACCOUNT_PRIVATE=

# Works on local/dev environment
MORALIS_DEV_SERVER_URL=
MORALIS_DEV_APPLICATION_ID=

# Works on production environment
MORALIS_SERVER_URL=
MORALIS_APPLICATION_ID=
```


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

## Requirements

- [NodeJS](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) *(optional)*
- [Metamask](https://metamask.io/) wallet extension installed as a browser extension 
- [Moralis](https://moralis.io/) Account
- [WebXR API Emulator](https://blog.mozvr.com/webxr-emulator-extension/) *(optional)*

### Background information

Before creating our own NFT, let’s take a look at the technologies and features that make NFTs work.

#### Fungible vs. non-fungible

[Fungibility](https://www.investopedia.com/terms/f/fungibility.asp#:~:text=Fungibility%20is%20the%20ability%20of,equal%20value%20between%20the%20assets.) is essentially the ability to exchange an item for a similar item of the same value. Consider a five-dollar bill. It always equals the same amount anywhere in the world. You can exchange five one-dollar bills for a single five-dollar bill, and they are worth the same value all the time.

On the other hand, non-fungible items do not have the same value in comparison to each other. For example, an exact replica of the Mona Lisa is not equal in value to the original painting, despite being the same in every way. Non-fungible items are inherently unique and cannot be considered equivalent to any other item.

An item can be both fungible and non-fungible. For example, while two seats in economy class on a plane are worth the same price, one person may place sentimental value on a window seat, decreasing the value of every other seat for that person.

#### Blockchain

A [blockchain](https://ethereum.org/en/developers/docs/intro-to-ethereum/#what-is-a-blockchain) is a public database or digital ledger that keeps track of transactions. It is replicated across several computer systems that are part of the chain. We’ll build our NFT on the Ethereum blockchain.

#### Minting ERC721 tokens

Minting is the process of creating something for the first time, or in our case, publishing a unique instance of our [ERC721 token](https://docs.alchemy.com/alchemy/tutorials/how-to-create-an-nft/how-to-mint-a-nft) on the blockchain. [ERC-721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/) is the standard for creating an NFT, and an ERC721 token is a unique representation of digital content published to the Ethereum blockchain. No two tokens are ever the same, so each time you mint a new token with the same block of code, a new address will be generated.

#### Smart contracts and NFTs

[Smart contracts](https://ethereum.org/en/developers/docs/smart-contracts/) are simple programs that are deployed to the blockchain and run as-is, meaning they’re not controlled by a user. We can use a smart contract to create and track our tokens.

An NFT is a digital store of data that conforms to the ERC-721 standard and lives on a public blockchain. NFTs contain information or data about the asset they represent, which could be a digital item like a Tweet or a physical item like a [hoodie](https://www.theguardian.com/fashion/2021/apr/15/virtual-hoodie-sells-non-fungible-token-nft-overpriced).

A smart contract can be considered an NFT if it implements the ERC-721 standard, and an NFT is an instance of a smart contract. Each time we mint a new NFT, we use the smart contract code that has been deployed to the blockchain.

#### Public networks: Mainnet vs. Testnet

Ethereum uses multiple networks. The network used in production is usually referred to as Mainnet and the others, which are used for testing, are called Testnet. We’ll deploy the NFT we create to the [Mumbai Testnet](https://mumbai.polygonscan.com/), a proof-of-work Testnet for Polygon.

Note that when we eventually deploy our NFT, either to production or to the Mainnet, the transaction history and balances we have on the Mumbai Testnet will not carry over. Think of the Testnet as a public staging/development environment and the Mainnet as a production environment.

#### Private networks

A network is considered private if its nodes are not connected to the public blockchain. You can run the Ethereum blockchain on a private network, like your local machine, or on a group of machines, like consortium networks, that are not accessible on the Mainnet or Testnet.

Running the Ethereum blockchain on a group of machines like an intranet would require validating transactions with a [node](https://ethereum.org/en/developers/docs/nodes-and-clients/), an Ethereum software running on a client that verifies blocks and transaction data.

[HardHat](https://hardhat.org/) and [Ganache](https://www.trufflesuite.com/ganache) are two examples of Ethereum blockchain development environments that you can run on your local machine to compile, test, deploy, and debug your smart contract application.

We’ll run our application on a public network so that it can be accessed by anyone connected to the network.

#### Faucets

To test our application, we need to get Ether (ETH), the Ethereum cryptocurrency, from a faucet. Faucets, like the [Mumbai Faucet](https://faucet.polygon.technology/), are web apps that allow you to specify and send test ETH to an address, which you can then use to complete transactions on a Testnet.

The price of ETH on exchanges is determined by transactions occurring on the Mainnet at any given time. If you choose to run your Ethereum application on a private network, you don’t need test ETH.

#### Nodes and clients

As previously mentioned, nodes verify blocks and transaction data. You can create your own node using clients like [Geth](https://geth.ethereum.org/downloads/) and [OpenEthereum](https://github.com/openethereum/openethereum/releases/) and contribute to the Ethereum blockchain by validating transactions and blocks on the blockchain.

You can skip the process of creating your own node and instead use one hosted on the cloud with a [node-as-a-service](https://ethereum.org/en/developers/docs/nodes-and-clients/nodes-as-a-service/) platform like [Alchemy](https://www.alchemyapi.io/) or [Moralis](https://moralis.io/). We can quickly move from development to production and ensure that we get important metrics for our application.

## Technology Stack

### Main

- Web framework - [React](https://reactjs.org/) / [NextJS](https://nextjs.org/) (with [Static Export](https://nextjs.org/docs/advanced-features/static-html-export))
- Solidity development environment - [Hardhat](https://hardhat.org/)
- File Storage - [IPFS](https://ipfs.io/)
- Ethereum Client Library - [Ethers](https://github.com/ethers-io/ethers.js) / [React Moralis](https://github.com/MoralisWeb3/react-moralis)
- Database (only metadata) - [MongoDB](https://www.mongodb.com/)
- Virtual Reality - [WebXR](https://immersive-web.github.io/) / [ThreeJS](https://threejs.org/)

### Libraries

- [React Error Boundary](https://github.com/bvaughn/react-error-boundary)
- [React Query](https://react-query.tanstack.com/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [React Three XR](https://github.com/pmndrs/react-xr)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Chakra UI](https://chakra-ui.com/)
- [Axios](https://github.com/axios/axios)
- [Solidity](https://docs.soliditylang.org/)
- [Mongoose](https://mongoosejs.com/)

## Project Structure

The project uses NextJS and the source code is mostly contained within the `src` path.
The pages are contained within the `src/pages` and API for backend services on `src/pages/api`.


**Components Folder**

Components are the building blocks of any react project. This folder consists of a collection of UI components like buttons, modals, inputs, loader, etc., that can be used across various files in the project.

**Pages Folder**

The files in the pages folder indicate the route of the react application. Each file in this folder contains its route. A page can contain its subfolder. Each page has its state and is usually used to call an async operation. It usually consists of various components grouped.

**Api Folder**

Like pages folder, api folder indicate the route of the react application. Any file inside the folder `pages/api` is mapped to `/api/*` and will be treated as an API endpoint instead of a page. They are server-side only bundles and won't increase your client-side bundle size.

**Config Folder**

This folder consists of some configuration files where we store environment variables. We will use this file to set up multi-environment configurations or settings in the application (like address of the contracts deployed).

**Utils Folder**

Utils folder consists of some repeatedly used functions that are commonly used in the project. It should contain only common js functions & objects like dropdown options, regex condition, data formatting, etc.

**Contracts Folder**

The contracts folder contains all the smart contracts (using [Solidity](https://docs.soliditylang.org/)) that need to be deployed on the blockchain and make our project work.

**Scripts Folder**

This folder contains generic scripts but in particular here we can find the deploy script that allows us to deploy our smart contracts on the blockchain via hardhat.

## Coding style

Follow the guidelines [HERE](./CODING_STYLE.md)

## How to contribute

Follow the guidelines [HERE](./CONTRIBUTING.md)
