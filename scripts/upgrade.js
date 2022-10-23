/**
 * Upgrade smart contracts yet deployed on blockchain
 */
const {ethers, upgrades} = require("hardhat");
const {MarketAddress} = require("../addresses");
const fs = require("fs");

async function main() {
	const [deployer] = await ethers.getSigners();

	console.log("Upgrading contracts with the account:", deployer.address);
	console.log("Upgrading NFTMarket to address:", MarketAddress);

	const NFTMarket = await ethers.getContractFactory("MarketUpgradeable");
	const nftMarket = await upgrades.upgradeProxy(MarketAddress, NFTMarket);
	await nftMarket.deployed();

	console.log("Market upgraded!");
	console.log(" - Market(proxy) Address:", nftMarket.address);
	console.log(
		" - Implementation Address:",
		await upgrades.erc1967.getImplementationAddress(nftMarket.address),
	);
	console.log(" - Admin Address:", await upgrades.erc1967.getAdminAddress(nftMarket.address));

	const artifact = require("../artifacts/contracts/MarketUpgradeable.sol/MarketUpgradeable.json");
	fs.writeFileSync("packages/abis/Market.json", JSON.stringify(artifact.abi), {
		encoding: "utf8",
		flag: "w",
	});
	console.log("Market contract ABI exported to ./abis/Market.json");
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
