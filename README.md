# NFT Marketplace

![](/docs/images/cover.png)

Watch your Digital Art on the wall of your home. Use the VR viewer to see all your NFTs on your own metaverse, creating your virtual room gallery, or watch them with the AR on the wall of your home.

## Summary

- [Summary](#summary)
- [Setup](#setup)
    - [Local Setup](#local-setup)
    - [Using Docker](#using-docker)
        - [Makefile](#makefile)
    - [Configuration](#configuration)
        - [Configure Moralis and Hardhat](#configure-moralis-and-hardhat)
- [Requirements](#requirements)
    - [Background informations](#background-informations)
    - [Connect Metamask to Polygon](#connect-metamask-to-polygon)
- [Technology Stack](#technology-stack)
    - [Main](#main)
    - [Other](#other)
- [Workflows](#workflows)
- [Structure](#structure)
- [Coding Style](#coding-style-coding-style-md)
- [How to Contribute](#how-to-contribute-contributing-md)
- [How to Release](#how-to-release-docs-release-md)
- [How to Deploy](#how-to-deploy-docs-deploy-md)

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

    Open [http://localhost:3000](http://localhost:3000) with yomposeur browser to see the result.

### Using Docker

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
2. Build your containers with `docker-compose build` _(you need to rebuild if you make changes to the source code)_
3. Run your containers with `docker-compose up -d`
4. You can check the status of your containers created with `docker-compose ps`

#### Makefile

The GNU make utility, commonly abbreviated make, is a tool for controlling the generation of executables from source files. A makefile is a special file, containing shell commands, that you create and name Makefile. While in the directory containing this makefile, you will type `make [target]` and the commands in the makefile will be executed. Type `make help` to see the list of available targets.

> **Install on Windows**
>
> An easy way to get GNU make on Windows is using chocolatey package manager.
>
> 1.  Install chocolatey from [here](https://chocolatey.org/install)
> 2.  Then run `choco install make`

**Targets**

You need to configure your environment variables on `.env` file to target the right docker compose configuration.

Below some of the most important targets:

-   `make build`: Builds the docker images
-   `make start`: Starts the docker containers
-   `make stop`: Stops the docker containers
-   `make ps`: Shows the status of the docker containers
-   `make help`: Prints the complete list of the available targets...

### Configuration

#### Configure Moralis and Hardhat

The project is based over Moralis API (but it's functionality is code wrapped to permit to be replaced based on furure needs). Rename `.env.sample` to `.env` in the main folder and provide your `appId` and `serverUrl` from Moralis ([How to start Moralis Server](https://docs.moralis.io/moralis-server/getting-started/create-a-moralis-server)).

To deploy to Polygon test or main networks we need to configure hardhat so we need to get the WebSocket and JSON RPC url from Moralis. Once you log into your account, go to the "Speedy Nodes" section. Click on the "Endpoints" button for the Network you need to configure. You will see separate URLs for each network and each archive version.

> **NOTE:** Moralis closes your server every 7 days, so if you have problems with API calls the server is probably down and you need to remember that you need to restart the server.

## Requirements

-   [NodeJS](https://nodejs.org/en/download/)
-   [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) _(optional)_
-   [Metamask](https://metamask.io/) wallet extension installed as a browser extension
-   [Moralis](https://moralis.io/) Account
-   [WebXR API Emulator](https://blog.mozvr.com/webxr-emulator-extension/) _(optional)_

### Background informations

If you are new in the blockchain world and you need more background information about read this page.

**[Go to the page >](./docs/infos.md)**

### Connect Metamask to Polygon

How to connect Polygon Testnet to MetaMask wallet? The easiest way to get it done is by searching "MATIC" on [Chainlist](https://chainlist.org/) and clicking "Add To Metamask" on "Matic (Polygon) Testnet Mumbai", and you are good to go.

## Technology Stack

![](/docs/images/tech-stack.png)

### Main

-   **Web Framework:** [React](https://reactjs.org/) / [NextJS](https://nextjs.org/) (with [TypeScript](https://www.typescriptlang.org/))
-   **API:** [GraphQL](https://graphql.org/) / [Apollo Server](https://www.apollographql.com/)
-   **Database:** [MongoDB](https://www.mongodb.com/)
-   **Solidity Environment:** [Hardhat](https://hardhat.org/)
-   **File Storage:** [IPFS](https://ipfs.io/) / [NFT Storage](https://nft.storage/)
-   **Ethereum Client:** [Ethers](https://github.com/ethers-io/ethers.js) / [React Moralis](https://github.com/MoralisWeb3/react-moralis)
-   **Indexing Service:** [NodeJS](https://nodejs.org/)
-   **Cross Reality:** [WebXR](https://immersive-web.github.io/) / [ThreeJS](https://threejs.org/)
-   **Web Socket:** [socket.io](https://socket.io)

### Other

-   [Solidity](https://docs.soliditylang.org/) - Smart Contracts
-   [Mongoose](https://mongoosejs.com/) - MongoDB object modeling
-   [Chakra UI](https://chakra-ui.com/) - UI Library
-   [Axios](https://github.com/axios/axios) - HTTP Client
-   [Apollo](https://www.apollographql.com/docs/react/) - GraphQL Client
-   [AFrame](https://aframe.io/) - XR Framework
-   [ThreeJS](https://threejs.org/) / [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - 3D Rendering
-   [React Query](https://react-query.tanstack.com/) - Data synchronization and caching
-   [React Icons](https://react-icons.github.io/react-icons/) - Icons
-   [React i18next for NextJS](https://github.com/isaachinman/next-i18next) - i18n Library
-   [React Error Boundary](https://github.com/bvaughn/react-error-boundary) - Error boundary
-   [GraphQL Compose](https://graphql-compose.github.io/) - Schema composer for GraphQL
-   [GraphQL Code Generator](https://www.graphql-code-generator.com/) - Code generator for GraphQL

## Workflows

-   [Market flow](./docs/workflow-market.md)
-   [Authentication flow](./docs/workflow-auth.md)

## Structure

The project is a monorepo that contains the following applications:

-   **Web App** (Path: `app`) - The NextJS client application of the NFT Marketplace.
-   **Indexer** (Path: `servers/indexer`) - The NodeJS indexer for the smart contracts deployed on the blockchain.
-   **Parser** (Path: `servers/parser`) - A parse-server backend to migrate from a hosted server on Moralis to a self-hosted server.

The other important directories to keep in mind are:

-   **Application Binary Interface** (Path: `abis`)

    The smart contract's ABIs are contained here. They are very similar to API so they are a human-readable representation of a code’s interface. ABI defines the methods and structures used to interact with the binary contract, just like API does but on a lower-level.

-   **Smart Contracts** (Path: `contracts`)

    The contracts folder contains all the smart contracts (using [Solidity](https://docs.soliditylang.org/)) that need to be deployed on the blockchain and make our project work.

-   **Docker** (Path: `docker`)

    It contains all docker containers configuration that need to be deployed through the Docker Compose and the Makefile help.

-   **Scripts** (Path: `scripts`)

    This folder contains generic scripts but in particular here we can find the deploy script that allows us to deploy our smart contracts on the blockchain via hardhat.

## [Coding Style](./CODING_STYLE.md)

## [How to Contribute](./CONTRIBUTING.md)

## [How to Release](./docs/release.md)

## [How to Deploy](./docs/deploy.md)
