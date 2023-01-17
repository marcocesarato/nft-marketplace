# NFT MarketVerse - Decentralized App

## Description

This dApp is built over [Next.js](https://nextjs.org/), an web development framework enabling [React](https://reactjs.org/)-based web
applications with server-side rendering. Where traditional React apps can only render their
content in the client-side browser, Next.js extends this functionality to include applications
rendered on the server-side.

### Microservices

The app expose the following microservices:

-   GraphQL Server
-   WebSocket
-   Authentication
-   IPFS Upload
-   IPFS Proxy Gateway _(to bypass the CORS policy)_

### Source hierarchy

The source's folders hierarchy should maintain the following example structure:

```text
├── components
│   ├── Component
│   │   ├── SubComponent
│   │   │   ├── SubComponent.spec.tsx
│   │   │   ├── SubComponent.stories.tsx
│   │   │   ├── index.tsx
│   │   ├──  Component.spec.tsx
│   │   ├──  Component.stories.tsx
│   │   ├──  index.tsx
├── hooks
│   ├── useHook.tsx
│   ├── useData
│   │   ├──  useData.test.tsx
│   │   ├──  index.tsx
├── contexts
│   ├── Global
│   │   ├──  index.tsx
│   │   ├──  reducer.ts
│   │   ├──  initialState.ts
```

## Structure

The app's source code is mostly contained within the `src` path (Alias: `@app`). Below are the most important folder to be mentioned.

-   **Components** _(Path: `src/components` | Alias: `@components`)_:
    Components are the building blocks of any react project. This folder consists of a collection of UI components like buttons, modals, inputs, loader, etc., that can be used across various files in the project. Errors components are contained inside `src/errors` (Alias: `@errors`) folder.

-   **Hooks** _(Path: `src/hooks` | Alias: `@hooks`)_:
    This folder consist in a collection of React Hooks which are still only used by components. Only hooks that can be consumed by all React components end up in the hooks/folder.

-   **Contexts** _(Path: `src/contexts` | Alias: `@contexts`)_:
    Like hooks, the same strategy may apply for contexts which needs to be accessed globally by all your other files.

-   **Pages** _(Path: `src/pages` | Alias: `@pages`_:
    The files in the pages folder indicate the route of the React application. Each file in this folder contains its route. A page can contain its subfolder. Each page has its state and is usually used to call an async operation. It usually consists of various components grouped.

-   **Api** _(Path: `src/pages/api`)_:
    Like pages' folder, api folder indicate the route of the React application. Any file inside the folder `pages/api` is mapped to `/api/*` and will be treated as an API endpoint instead of a page. They are server-side only bundles and won't increase your client-side bundle size.

-   **Configs** _(Path: `src/configs` | Alias: `@configs`)_:
    This folder consists of some configuration files where we store environment variables. We will use this file to set up multi-environment configurations or settings in the application (like address of the contracts deployed).

-   **Utils** _(Path: `src/utils` | Alias: `@utils`)_:
    Utils folder consists of some repeatedly used functions that are commonly used in the project. It should contain only common js functions & objects like dropdown options, regex condition, data formatting, etc.

-   **Layouts** _(Path: `src/layouts` | Alias: `@layouts`)_:
    As the name says, it contains layouts available to the whole project like header, footer, etc. We can store the header, footer, or sidebar code here and call it.

-   **Scripts** _(Path: `scripts`)_:
    This folder contains generic scripts but in particular here we can find the graphql generation configurations.

## Code generation

The app use [Plop.js](https://plopjs.com/) as template generator and [GraphQL Code Generator](https://the-guild.dev/graphql/codegen) to generate the GraphQL client.
The templates files are inside the `templates` folder.

> Note: remember to start the dev environment (`yarn dev`) before to run GraphQL Codegen command

```shell
# To run the template generator
yarn codegen
# To run the GraphQL Codegen
yarn codegen:graphql
```

## Testing

The app have three different types of tests using [Cypress](https://www.cypress.io/) (then [Chai.js](https://www.chaijs.com/) for BDD and TDD tests) and [Storybook](https://storybook.js.org/).
The types are the following:

-   End-to-end Test (e2e) - with file extension `.cy.*` on `cypress/e2e` path
-   Component Test - with file extension `.spec.*` on component directory
-   Unit Test - with file extension `.test.*` on file directory

```shell
# Run component and unit tests
yarn test
# Run only e2e tests
yarn test:e2e
# Run only unit tests
yarn test:unit
# Run all tests checking the coverage
yarn coverage
# Open the coverage report
yarn coverage:report
```

### Storybook

Run the storybook, a frontend workshop for building UI components and pages in isolation to facilitate component tests:

```shell
yarn storybook
# You can also build it to static files
yarn storybook:build
```
