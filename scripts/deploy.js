/**
 * Deploy smart contracts to blockchain
 */
const {ethers} = require("hardhat");
const fs = require("fs");
const path = require("path");
const {DotEnv} = require("@packages/dotenv");

async function main() {
	const [deployer] = await ethers.getSigners();

	console.log("Deploying contracts with the account:", deployer.address);

	const NFTMarket = await ethers.getContractFactory("Market");
	const nftMarket = await NFTMarket.deploy();
	await nftMarket.deployed();

	const txHash = nftMarket.deployTransaction.hash;
	const txReceipt = await ethers.provider.waitForTransaction(txHash);
	const nftMarketAddress = txReceipt.contractAddress;

	console.log("Market contract deployed to", nftMarketAddress);

	const artifact = require("../artifacts/contracts/Market.sol/Market.json");
	fs.writeFileSync("abis/Market.json", JSON.stringify(artifact.abi));
	console.log("Market contract ABI exported to ./packages/abis/Market.json");

	const config = {MarketAddress: nftMarketAddress};

	const dotenv = new DotEnv();
	dotenv.load(false);
	dotenv.save({"NEXT_PUBLIC_CHAIN_ADDRESSES": `'${JSON.stringify(config)}'`});

	console.log(`Addresses exported to ./${path.basename(dotenv.path)}`);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
