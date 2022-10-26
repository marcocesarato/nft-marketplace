# NFT Marketplace

![](/docs/images/cover.png)

Watch your Digital Art on the wall of your home. Use the VR viewer to see all your NFTs on your own metaverse, creating your virtual room gallery, or watch them with the AR on the wall of your home.

## Summary

-   [Summary](#summary)
-   [Setup](#setup)
    -   [Local Setup](#local-setup)
    -   [Using Docker](#using-docker)
        -   [Makefile](#makefile)
    -   [Configuration](#configuration)
        -   [Dotenv](#dotenv)
        -   [Variables](#variables)
-   [Requirements](#requirements)
    -   [Background informations](#background-informations)
    -   [Connect Metamask to Polygon](#connect-metamask-to-polygon)
-   [Technology Stack](#technology-stack)
    -   [Main](#main)
    -   [Other](#other)
-   [Workflows](#workflows)
-   [Structure](#structure)
-   [Coding Style](#coding-style-coding-style-md)
-   [How to Contribute](#how-to-contribute-contributing-md)
-   [How to Release](#how-to-release-docs-release-md)
-   [How to Deploy](#how-to-deploy-docs-deploy-md)

## Setup

### Local Setup

To run this project locally, follow these steps.

1. Clone the project locally, change into the directory of the `marketplace`.

    ```sh
    git clone http://10.40.3.152:13000/gogsadmin/nft-marketplace.git marketplace
    ```

2. Install the dependencies.

    ```sh
    yarn install
    ```

3. (**optional**, to start localnet) Start a local Hardhat node. If you configure it, you need to start it every time you run the application (see [configuration](#configuration)).

    ```sh
    npx hardhat node
    ```

4. (**optional**, to deploy contracts) With the network running, deploy the contracts to the local network in a separate terminal window. Change network depends your needs.

    ```sh
    yarn deploy # or yarn deploy:test for testnet and yarn deploy:local for localnet (started on step 3)
    ```

5. Start the app and go to [http://localhost:3000](http://localhost:3000) with your browser.

    ```sh
    yarn dev
    ```

### Using Docker

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
2. Build your containers with `docker-compose build` _(you need to rebuild if you make changes to the configuration code)_
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

The project is based over Moralis API (but its functions is code wrapped to permit to be replaced easly based on future needs).

#### Dotenv

Copy the dotenv sample from `docs/.env.sample` and move it to the root renaming to `.env`.

#### Variables

Provide your `MASTER_API_KEY` from [Moralis](https://docs.moralis.io/docs/moralis-onboarding).

To deploy to the blockchain, test or main networks, we need to configure hardhat so we need to get the WebSocket and JSON RPC URLs from [Alchemy](https://www.alchemy.com/). Once you log into your account, create your project for the Network you need to configure and then copy the WebSocket and JSON RPC URLs and paste it on the `.env` file.

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
-   **Auth:** [NextAuth](https://next-auth.js.org/)
-   **Database:** [MongoDB](https://www.mongodb.com/)
-   **Solidity Environment:** [Hardhat](https://hardhat.org/)
-   **File Storage:** [IPFS](https://ipfs.io/) / [NFT Storage](https://nft.storage/)
-   **Ethereum Client:** [Ethers](https://github.com/ethers-io/ethers.js) / [Moralis](https://github.com/MoralisWeb3/Moralis-JS-SDK) / [Wagmi](https://wagmi.sh/)
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

-   **Smart Contracts** (Path: `contracts`)

    The contracts folder contains all the smart contracts (using [Solidity](https://docs.soliditylang.org/)) that need to be deployed on the blockchain and make our project work.

-   **Docker** (Path: `docker`)

    It contains all docker containers configuration that need to be deployed through the Docker Compose and the Makefile help.

-   **Scripts** (Path: `scripts`)

    This folder contains generic scripts but in particular here we can find the deploy script that allows us to deploy our smart contracts on the blockchain via hardhat.

-   **Application Binary Interface** (Path: `packages/abis`)

    The smart contract's ABIs are contained here. They are very similar to API so they are a human-readable representation of a code’s interface. ABI defines the methods and structures used to interact with the binary contract, just like API does but on a lower-level.

## [Coding Style](./CODING_STYLE.md)

## [How to Contribute](./CONTRIBUTING.md)

## [How to Release](./docs/release.md)

## [How to Deploy](./docs/deploy.md)
