const {ethers, upgrades} = require("hardhat");
const {MarketAddress} = require("../addresses");

async function main() {
	const [deployer] = await ethers.getSigners();

	console.log("Deploying contracts with the account:", deployer.address);

	const NFTMarket = await ethers.getContractFactory("Market");
	const nftMarket = await upgrades.upgradeProxy(MarketAddress, NFTMarket);
	await nftMarket.deployed();

	console.log("Market contract upgraded!");
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
