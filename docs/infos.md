# Background information

Before creating our own NFT, let’s take a look at the technologies and features that make NFTs work.

## Fungible vs. non-fungible

[Fungibility](https://www.investopedia.com/terms/f/fungibility.asp#:~:text=Fungibility%20is%20the%20ability%20of,equal%20value%20between%20the%20assets.) is essentially the ability to exchange an item for a similar item of the same value. Consider a five-dollar bill. It always equals the same amount anywhere in the world. You can exchange five one-dollar bills for a single five-dollar bill, and they are worth the same value all the time.

On the other hand, non-fungible items do not have the same value in comparison to each other. For example, an exact replica of the Mona Lisa is not equal in value to the original painting, despite being the same in every way. Non-fungible items are inherently unique and cannot be considered equivalent to any other item.

An item can be both fungible and non-fungible. For example, while two seats in economy class on a plane are worth the same price, one person may place sentimental value on a window seat, decreasing the value of every other seat for that person.

## Blockchain

A [blockchain](https://ethereum.org/en/developers/docs/intro-to-ethereum/#what-is-a-blockchain) is a public database or digital ledger that keeps track of transactions. It is replicated across several computer systems that are part of the chain. We’ll build our NFT on the Ethereum blockchain.

## Minting ERC721 tokens

Minting is the process of creating something for the first time, or in our case, publishing a unique instance of our [ERC721 token](https://docs.alchemy.com/alchemy/tutorials/how-to-create-an-nft/how-to-mint-a-nft) on the blockchain. [ERC-721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/) is the standard for creating an NFT, and an ERC721 token is a unique representation of digital content published to the Ethereum blockchain. No two tokens are ever the same, so each time you mint a new token with the same block of code, a new address will be generated.

## Smart contracts and NFTs

[Smart contracts](https://ethereum.org/en/developers/docs/smart-contracts/) are simple programs that are deployed to the blockchain and run as-is, meaning they’re not controlled by a user. We can use a smart contract to create and track our tokens.

An NFT is a digital store of data that conforms to the ERC-721 standard and lives on a public blockchain. NFTs contain information or data about the asset they represent, which could be a digital item like a Tweet or a physical item like a [hoodie](https://www.theguardian.com/fashion/2021/apr/15/virtual-hoodie-sells-non-fungible-token-nft-overpriced).

A smart contract can be considered an NFT if it implements the ERC-721 standard, and an NFT is an instance of a smart contract. Each time we mint a new NFT, we use the smart contract code that has been deployed to the blockchain.

## Public networks: Mainnet vs. Testnet

Ethereum uses multiple networks. The network used in production is usually referred to as Mainnet and the others, which are used for testing, are called Testnet. We’ll deploy the NFT we create to the [Mumbai Testnet](https://mumbai.polygonscan.com/), a proof-of-work Testnet for Polygon.

Note that when we eventually deploy our NFT, either to production or to the Mainnet, the transaction history and balances we have on the Mumbai Testnet will not carry over. Think of the Testnet as a public staging/development environment and the Mainnet as a production environment.

## Private networks

A network is considered private if its nodes are not connected to the public blockchain. You can run the Ethereum blockchain on a private network, like your local machine, or on a group of machines, like consortium networks, that are not accessible on the Mainnet or Testnet.

Running the Ethereum blockchain on a group of machines like an intranet would require validating transactions with a [node](https://ethereum.org/en/developers/docs/nodes-and-clients/), an Ethereum software running on a client that verifies blocks and transaction data.

[HardHat](https://hardhat.org/) and [Ganache](https://www.trufflesuite.com/ganache) are two examples of Ethereum blockchain development environments that you can run on your local machine to compile, test, deploy, and debug your smart contract application.

We’ll run our application on a public network so that it can be accessed by anyone connected to the network.

## Faucets

To test our application, we need to get Ether (ETH), the Ethereum cryptocurrency, from a faucet. Faucets, like the [Mumbai Faucet](https://faucet.polygon.technology/), are web apps that allow you to specify and send test ETH to an address, which you can then use to complete transactions on a Testnet.

The price of ETH on exchanges is determined by transactions occurring on the Mainnet at any given time. If you choose to run your Ethereum application on a private network, you don’t need test ETH.

## Nodes and clients

As previously mentioned, nodes verify blocks and transaction data. You can create your own node using clients like [Geth](https://geth.ethereum.org/downloads/) and [OpenEthereum](https://github.com/openethereum/openethereum/releases/) and contribute to the Ethereum blockchain by validating transactions and blocks on the blockchain.

You can skip the process of creating your own node and instead use one hosted on the cloud with a [node-as-a-service](https://ethereum.org/en/developers/docs/nodes-and-clients/nodes-as-a-service/) platform like [Alchemy](https://www.alchemyapi.io/) or [Moralis](https://moralis.io/). We can quickly move from development to production and ensure that we get important metrics for our application.

## Minting
Minting basically refers to the process of turning digital art into a part of the Ethereum blockchain as a public ledger. NFTs ensure representation for your digital artwork. At the same time, it also ensures that the artwork can be flexibly traded or purchased in the market.
One thing to note is that every transaction on the blockchain has a cost. So when you want to mint, buy or sell an NFT, you need to pay the price called gas fee.

## Gas Fees
Gas fees are payments made by users to compensate for the computing energy required to process and validate transactions on the Ethereum blockchain. A higher gas limit means that you must do more work to execute a transaction using crypto or a smart contract.

For this reason we will use a MongoDB to store non-static metadata, like user preferences or tags on products, so we dont't need to pay a gas fee.

## Metadata

As mentioned above Minting is pretty much a 3 step process

1. Upload the image to IPFS
2. Create and upload a metadata JSON file to IPFS
3. Pin the CID that is returned for each of these

The metadata file can contain multiple keys as many as you like, however you must have the 3 required keys: name, description and image.

**[< Go to README](../README.md)**
