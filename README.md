# NFT Marketplace

Watch your Digital Art on the wall of your home. Use the VR viewer to see all your NFTs digital art on the wall of your home in real time and interact with them.

## Summary

- [Summary](#summary)
- [Setup](#setup)
    - [Local Setup](#local-setup)
    - [Using Docker](#using-docker)
    - [Configuration](#configuration)
        - [Configure Moralis and Hardhat](#configure-moralis-and-hardhat)
- [Requirements](#requirements)
    - [Background informations](#background-informations)
    - [Connect Metamask to Polygon](#connect-metamask-to-polygon)
- [Technology Stack](#technology-stack)
    - [Main](#main)
    - [Other](#other)
- [Workflow](#workflow)
    - [Main flow](#main-flow)
    - [Authentication flow](#authentication-flow)
- [Structure](#structure)
    - [Folders](#folders)
    - [Source hierarchy](#source-hierarchy)
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
PUBLIC_URL=http://localhost:3000

# MongoDB
MONGODB_URI=mongodb://marketplace:CHANGEME!@mongo:27017/metadata
MONGODB_ROOT_USERNAME=marketplace
MONGODB_ROOT_PASSWORD=CHANGEME!

# IPFS
IPFS_API_KEY=

# JSON RPC
CHAIN_TESTNET_URL=
CHAIN_MAINNET_URL=

# WebSocket
CHAIN_TESTNET_WSS=
CHAIN_MAINNET_WSS=

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

### Connect Metamask to Polygon

How to connect Polygon Testnet to MetaMask wallet? The easiest way to get it done is by searching "MATIC" on [Chainlist](https://chainlist.org/) and clicking "Add To Metamask" on "Matic (Polygon) Testnet Mumbai", and you are good to go.

## Technology Stack

![](/docs/images/tech-stack.png)
### Main

- **Web Framework:** [React](https://reactjs.org/) / [NextJS](https://nextjs.org/) (with [TypeScript](https://www.typescriptlang.org/))
- **API:** [GraphQL](https://graphql.org/) / [Apollo Server](https://www.apollographql.com/)
- **Database:** [MongoDB](https://www.mongodb.com/)
- **Solidity Environment:** [Hardhat](https://hardhat.org/)
- **File Storage:** [IPFS](https://ipfs.io/) / [NFT Storage](https://nft.storage/)
- **Ethereum Client:** [Ethers](https://github.com/ethers-io/ethers.js) / [React Moralis](https://github.com/MoralisWeb3/react-moralis)
- **Blockchain Indexing:** [NodeJS](https://nodejs.org/)
- **Cross Reality:** [WebXR](https://immersive-web.github.io/) / [ThreeJS](https://threejs.org/)

### Other

- [Solidity](https://docs.soliditylang.org/) - Smart Contracts
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling
- [Chakra UI](https://chakra-ui.com/) - UI Library
- [Axios](https://github.com/axios/axios) - HTTP Client
- [Apollo](https://www.apollographql.com/docs/react/) - GraphQL Client
- [ThreeJS](https://threejs.org/) / [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - 3D Rendering
- [React Three XR](https://github.com/pmndrs/react-xr) - XR integration with ThreeJS
- [React Query](https://react-query.tanstack.com/) - Data synchronization and caching
- [React Icons](https://react-icons.github.io/react-icons/) - Icons
- [React i18next for NextJS](https://github.com/isaachinman/next-i18next) - i18n Library
- [React Error Boundary](https://github.com/bvaughn/react-error-boundary) - Error boundary
- [GraphQL Compose](https://graphql-compose.github.io/) - Schema composer for GraphQL
- [GraphQL Code Generator](https://www.graphql-code-generator.com/) - Code generator for GraphQL

## Workflow

### Main flow

[![](https://kroki.io/mermaid/svg/eNqdVF2L2zAQfO-v2LcmkCtNriltKIFLQ2mgB-VC6fNGXtsisuRK8qX37ytZtmzHSQ7qB3_IOzuj2V0Z-lORZLTlmGks3oC7StSWM16itPAddZKjHa1vhGJHliOXo187mdBf0uP1n9_2o8VHJTO13YzWvwpOMtCq0n0qaTUyayChUqgXOCl9TIU61RH-aoTerdedtBVsQzRr4TG8C7pzkAa8gieylZaASaLJGFDpl4NeszNySi6wBsEr2OMztXhyGaQnT3kGKBN42Ox80k6PeytKLpqMJMNTE7Ogs8NksVzOFh8-zubL5TRyej9qj7nMxj6MN9fUYwU_uLEkIVUarDqSNP3NvTVAz24HZpDJ12yQwxmkuQuEgiwmaHEYHsI8oimsM8QqTcDrP0ntgtIsJ-NYrVsISmKW1oL22aTpGRwV9JA3ogrUR7IQpUZv55_vZ-ANhsX8zN3f3OaAlc1dKs7QclfF141uqR86IMHJpzrR4X6AC6EOE13qg3xZAg6FcNoNzyS6vqRBjht7Vic5dvYVTGVIw6igUeh5PW-GD2dwU72AbzmN0qSkL-lqi4KTUJB4e__u03QQ2ZZoT0Jc7f-RHN_GrfKaHlI3dBcxbcf3DPIngqsOVFo4dP16FX6d0g0YL4rK4kF00xNLjcJ0mT3Tf4rTg-lwnH2mSdj7r6fd9Lb4fvkeuTuOAxCtRZZ72z1jTFYPdVlZqMr6cDHottBFqCAwDOKItx30S9_nh0HUd9aMvRn_B5zZDHM)](https://mermaid.live/view#pako:eNqdVu9v0zAQ_VdO-cImZYhtFEGEJq2MiUkgoVXAl365xpfWamIH21mppv3vnPM7TbbB8qFy43vv3r3zub0PYi0oiAJLvwtSMV1JXBvMlgr4ydE4GcsclYMvaMQG3Xhjnup4G29QqvHejRL0h8zExvfrxfjtN63W-mo-3viUSlJ1bp3zd62cwdhZEJSneg87bbZJqndViH9qvScXF53ACK6q8LjBd_Fd1AljanQEt-QKowCFMGQt6OTjylzEB-lJTOWtREewwDtqCIgplE-fyDWgEnA5v_GsnSJeZblMG0pS9cJQ7MCsV0dns1l49vZdeDqbHXdpvSul21KtJ9wYV1i3JoKv0jpSkGgDTm9J2X6FryzQHVdhh1S-fQMStslIjoSMHAp0eBBfxXlI3WO2xWlDIMsdUXqhTbwhy3kdv6i0dDStEe2iZuo53arog58Iy9BsyUGntzX59MN5CN5pODs9tPmXdBvAwm2YTMboJHf0Hxxvsl92SIKd59rR6nwIrGIZ1LrVR_kGVUBMU9Zv5VohH1MakjxRuN6pCYufARWWDIx722o9bO3T8cO5nBd78AfQoLIJmUlpTXPwqGpM-_Hm9fvjYWjTqgWl6eMDMVLkj3WjvlQACU_iNKgZgZ5N_qLgLkFhUoaXy8fxjyflmZNZVjhcpd08tT3H1HbUPtVL5ZnBsHDSfqqjqvwftzfHz8jvd_Gb5Lu6QqJzGG-89z5ly1bOeV44KPLyxrHIRXQRulJYzeU4cTv6ky_GN0Qr8uBk9uY-CIOMTIZS8I_gvYctA5aQ0TKIeCkowSJ1yyDsbf1EI31zrI-5r1ItmcZaXNM135zXmMl0XzHc6pV2OoQ7MgIVhlyysic8GjKpWT2Yr1ptXgZV2v1fUg98WKoHLr3I2QP6LCRnD6KEzxaFAV9terFXcRA5U1ATVP8xqKMe_gJPkZa3)

### Authentication flow

[![](https://kroki.io/mermaid/svg/eNp1kU1qwzAQhfc9xZB12wOEYijJJrtC6QHG8rMj4kjOSHba23ck_9Qm1GCMNO99M_MccOvhDI6WG-HrE-nTsURrbMcu0qG1cPHh-v3j9HB35MglB-TC6HspClXu6StAyLTWXGh38M7BRIqe7ty2iLtsUJ2qZ8aePiGDmnQ6sQgUz6BqKr6-lVKcauoTFd82xEA6fJlFzus25Ot8SIokRhtANlIDB-EIYnK4k3dY9R5HXjoLYi_uj7ldaxaP39QoKzuxQ-Jf8JP66o7BNv9CcjYToeMwbpkMqOiKELhBorCrRnhfaoTEVSVaXE2eOdPY-tp6TmzLWhyboDXIyVM9p27mzK6Z_KswOS8pa8YSGA8pUeP9xSL9V5MLvyCXyMs)](https://mermaid.live/view#pako:eNqdU8lu4zAM_RVCZ7cfYAwCFF2A3gYtpidfaIl2hdiUR6LTCYL8-1CW0yYtepgxYHjhW_ho-mBscGRqk-j3TGzpzmMfcWwY9Jgwird-Qha4HTyxfH1_8_Px68s7FGwxUakU6tVmo9gafiWKYAdvt9CY28BMVkACvOEwkDSmcBSqhJNODc8Ud8rTJqOnBPJK4Nbi9Y82bh47mLMw_fFJEmiGdgFx0FAQuuUhIzKYhkTgBXpiiigECExvEJjOzUvb79aRZI78Ifop2wldrtlqgU7R77LDlvbZWXMm33-vskxolZgwlaCZQQ5GSgl7yjLIrqjPrQ4S0LmoxfPmF6G1cz19d5rapdgH5WLaOs2V5KrsZ1-R-1XgbKK45IwXIu9Tw12eqw1h6yl_X7sUTGVGiiN6p0t3yMzGqOpIjan11lGH86BbUJ2VXjB6bAdKGXMobo1ZEzwElgcc_bAvCk-hDRKq3L9DxgoScrpKOc2qmsloJcT_o3KQfzPNxGPDR40-T7q0dO-8upu6Q93DyuAs4XnP1tQSZzqB1h9xRR3_ArK1PhY)

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

- **Layouts** (Path: `src/layouts` | Alias: `@layouts`)

    As the name says, it contains layouts available to the whole project like header, footer, etc. We can store the header, footer, or sidebar code here and call it.

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
│   │   ├──  index.tsx
├── contexts
│   ├── Global
│   │   ├──  index.tsx
│   │   ├──  reducer.ts
│   │   ├──  initialState.ts
```

## [Coding Style](./CODING_STYLE.md)

## [How to Contribute](./CONTRIBUTING.md)

## [How to Release](./docs/release.md)

## [How to Deploy](./docs/deploy.md)

