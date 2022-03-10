# NFT Marketplace

Use the VR viewer to see all your NFTs digital art on the wall of your home in real time and interact with them.

## Summary

- [Summary](#summary)
- [Setup](#setup)
    - [Local Setup](#local-setup)
    - [Using Docker](#using-docker)
    - [Configuration](#configuration)
        - [Configure Moralis and Hardhat](#configure-moralis-and-hardhat)
- [Requirements](#requirements)
    - [Background informations](#background-informations)
- [Technology Stack](#technology-stack)
    - [Main](#main)
    - [Other](#other)
- [Workflow](#workflow)
- [Structure](#structure)
    - [Folders](#folders)
    - [Source hierarchy](#source-hierarchy)
- [Coding Style](#coding-style)
- [How to Contribute](#how-to-contribute)
- [How to Release](#how-to-release)
- [How to Deploy](#how-to-deploy)

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

### Configuration

#### Configure Moralis and Hardhat

The project is based over Moralis API (but it's functionality is code wrapped to permit to be replaced based on furure needs). Rename `.env.example` to `.env` in the main folder and provide your `appId` and `serverUrl` from Moralis ([How to start Moralis Server](https://docs.moralis.io/moralis-server/getting-started/create-a-moralis-server)).

To deploy to Polygon test or main networks we need to configure hardhat so we need to get the WebSocket and JSON RPC url from Moralis. Once you log into your account, go to the "Speedy Nodes" section. Click on the "Endpoints" button for the Network you need to configure. You will see separate URLs for each network and each archive version.

> **NOTE:** Moralis closes your server every 7 days, so if you have problems with API calls the server is probably down and you need to remember that you need to restart the server.

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

# Moralis on local/dev environment
MORALIS_DEV_SERVER_URL=
MORALIS_DEV_APPLICATION_ID=

# Moralis on production environment
MORALIS_SERVER_URL=
MORALIS_APPLICATION_ID=
```

## Requirements

- [NodeJS](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) *(optional)*
- [Metamask](https://metamask.io/) wallet extension installed as a browser extension 
- [Moralis](https://moralis.io/) Account
- [WebXR API Emulator](https://blog.mozvr.com/webxr-emulator-extension/) *(optional)*

### Background informations

If you are new in the blockchain world and you need more background information about read this page.

**[Go to the page >](./docs/infos.md)**

## Technology Stack

### Main

- Web framework - [React](https://reactjs.org/) / [NextJS](https://nextjs.org/) (with [TypeScript](https://www.typescriptlang.org/))
- Solidity development environment - [Hardhat](https://hardhat.org/)
- File Storage - [IPFS](https://ipfs.io/)
- Ethereum Client Library - [Ethers](https://github.com/ethers-io/ethers.js) / [React Moralis](https://github.com/MoralisWeb3/react-moralis)
- Database (only metadata) - [MongoDB](https://www.mongodb.com/)
- Virtual Reality - [WebXR](https://immersive-web.github.io/) / [ThreeJS](https://threejs.org/)

### Other

- [Solidity](https://docs.soliditylang.org/)
- [Mongoose](https://mongoosejs.com/)
- [React Error Boundary](https://github.com/bvaughn/react-error-boundary)
- [React Query](https://react-query.tanstack.com/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [React Three XR](https://github.com/pmndrs/react-xr)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Chakra UI](https://chakra-ui.com/)
- [Axios](https://github.com/axios/axios)

## Workflow

[![](https://mermaid.ink/img/pako:eNp1VE2P2jAQ_Ssj99JKoKKW1ZYcVtosRd1DJQRVe8lliCfgYuzUdspStP-9YyUh4WNzijLvzZv3JvZR5FaSSISnPxWZnKYK1w53mQF-SnRB5apEE-AbOrnBcF1Itc23-QaVua7NnDWBjLyufLdmbafpdeF5PlvWX20Z4In5DvPgQVKp7QH21m0Lbfc1JD7NYMOHh26SBKY1PG_5Hb5DDZnTsBNYUKicAZTSkffkbwm0dhJY4l9qsWBN1CnUGtBIeEyf45doqeiUTyFEV79U2ABWYUOGfWNQjL82djZoJ_3Y8Qj2sdOeVp87WotkUhPyTQ5qTeEG6zzGtDp85ACNL8gBci79JKOVJWmtzPrG-Bdd4145t2AdgQ_sOa_7wY4CSgwI7wulidN08Ntb8-G8U6QPz1bQLsxA5TQEC46CU8R7OXX0UU2-OVLf6LwKUJVQsLpHTcB51fN17NMKTy9vbGjRDtIPrDFwA9Wk0U5dw5vVnTHmzubxfzPWDC9IYiB25HaoJJ_lY2yRCbawo0wk_CqpwEqHTAx6pZ_oFK448og51rKZMHwfpNZJcjX13Wg0nkxGDTUiWMWk23VTzifynsa9cmzwg17Ck9W27fHpfjy6m_RABXua4U7pQ41Y2JUNdsDZGz_05FRxAV6qf42Xuy_lSyZi7TUzr2y8KjkB-ioVb1skBWpPA8Gnyy4PJhdJcBW1oOZ2a1Cv_wEF7qN_)](https://mermaid.live/view/#pako:eNp1VE2P2jAQ_Ssj99JKoKKW1ZYcVtosRd1DJQRVe8lliCfgYuzUdspStP-9YyUh4WNzijLvzZv3JvZR5FaSSISnPxWZnKYK1w53mQF-SnRB5apEE-AbOrnBcF1Itc23-QaVua7NnDWBjLyufLdmbafpdeF5PlvWX20Z4In5DvPgQVKp7QH21m0Lbfc1JD7NYMOHh26SBKY1PG_5Hb5DDZnTsBNYUKicAZTSkffkbwm0dhJY4l9qsWBN1CnUGtBIeEyf45doqeiUTyFEV79U2ABWYUOGfWNQjL82djZoJ_3Y8Qj2sdOeVp87WotkUhPyTQ5qTeEG6zzGtDp85ACNL8gBci79JKOVJWmtzPrG-Bdd4145t2AdgQ_sOa_7wY4CSgwI7wulidN08Ntb8-G8U6QPz1bQLsxA5TQEC46CU8R7OXX0UU2-OVLf6LwKUJVQsLpHTcB51fN17NMKTy9vbGjRDtIPrDFwA9Wk0U5dw5vVnTHmzubxfzPWDC9IYiB25HaoJJ_lY2yRCbawo0wk_CqpwEqHTAx6pZ_oFK448og51rKZMHwfpNZJcjX13Wg0nkxGDTUiWMWk23VTzifynsa9cmzwg17Ck9W27fHpfjy6m_RABXua4U7pQ41Y2JUNdsDZGz_05FRxAV6qf42Xuy_lSyZi7TUzr2y8KjkB-ioVb1skBWpPA8Gnyy4PJhdJcBW1oOZ2a1Cv_wEF7qN_)

## Structure

The project's source code is mostly contained within the `src` path (Alias: `@app`).

### Folders

- **Components** (Path: `src/components` | Alias: `@components`)

    Components are the building blocks of any react project. This folder consists of a collection of UI components like buttons, modals, inputs, loader, etc., that can be used across various files in the project. Errors components are contained inside `src/errors` folder.

- **Hooks** (Path: `src/hooks` | Alias: `@hooks`)

    This folder consist in a collection of React Hooks which are still only used by components. Only hooks that can be consumed by all React components end up in the hooks/folder.

- **Contexts** (Path: `src/contexts` | Alias: `@contexts`)
  
    Like hooks, the same strategy may apply for contexts which needs to be accessed globally by all your other files.

- **Pages** (Path: `src/pages`)

    The files in the pages folder indicate the route of the react application. Each file in this folder contains its route. A page can contain its subfolder. Each page has its state and is usually used to call an async operation. It usually consists of various components grouped.

- **Api** (Path: `src/pages/api`)

    Like pages folder, api folder indicate the route of the react application. Any file inside the folder `pages/api` is mapped to `/api/*` and will be treated as an API endpoint instead of a page. They are server-side only bundles and won't increase your client-side bundle size.

- **Configs** (Path: `src/configs` | Alias: `@configs`)

    This folder consists of some configuration files where we store environment variables. We will use this file to set up multi-environment configurations or settings in the application (like address of the contracts deployed).

- **Utils** (Path: `src/utils` | Alias: `@utils`)

    Utils folder consists of some repeatedly used functions that are commonly used in the project. It should contain only common js functions & objects like dropdown options, regex condition, data formatting, etc.

- **Smart contracts**  (Path: `contracts`)

    The contracts folder contains all the smart contracts (using [Solidity](https://docs.soliditylang.org/)) that need to be deployed on the blockchain and make our project work.

- **Scripts** (Path: `scripts`)

    This folder contains generic scripts but in particular here we can find the deploy script that allows us to deploy our smart contracts on the blockchain via hardhat.


### Source hierarchy

The source's folders hiearachy should mantain the following example structure:

```text
├── components
│   ├── Component
│   │   ├── SubComponent
│   │   │   ├── SubComponent.spec.tsx
│   │   │   ├── index.tsx
│   │   ├──  Component.spec.tsx
│   │   ├──  index.tsx
├── hooks
│   ├── useData
│   │   ├──  index.ts
├── contexts
│   ├── Global
│   │   ├──  index.tsx
│   │   ├──  reducer.ts
│   │   ├──  initialState.ts
```

## Coding Style

**[Go to the guidelines >](./CODING_STYLE.md)**

## How to Contribute

**[Go to the guidelines >](./CONTRIBUTING.md)**

## How to Release

**[Go to the page >](./docs/release.md)**

## How to Deploy

**[Go to the page >](./docs/deploy.md)**

