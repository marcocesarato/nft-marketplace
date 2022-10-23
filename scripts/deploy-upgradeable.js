/**
 * Deploy smart contracts to blockchain
 */
const {ethers, upgrades} = require("hardhat");
const fs = require("fs");

async function main() {
	const [deployer] = await ethers.getSigners();

	console.log("Deploying contracts with the account:", deployer.address);

	const NFTMarket = await ethers.getContractFactory("MarketUpgradeable");
	const nftMarket = await upgrades.deployProxy(NFTMarket);
	await nftMarket.deployed();

	const txHash = nftMarket.deployTransaction.hash;
	const txReceipt = await ethers.provider.waitForTransaction(txHash);
	const nftMarketAddress = txReceipt.contractAddress;

	console.log("Market contract deployed to", nftMarketAddress);
	console.log(" - Market(proxy) Address:", nftMarket.address);
	console.log(
		" - Implementation Address:",
		await upgrades.erc1967.getImplementationAddress(nftMarket.address),
	);
	console.log(" - Admin Address", await upgrades.erc1967.getAdminAddress(nftMarket.address));

	const artifact = require("../artifacts/contracts/MarketUpgradeable.sol/MarketUpgradeable.json");
	fs.writeFileSync("packages/abis/Market.json", JSON.stringify(artifact.abi));
	console.log("Market contract ABI exported to ./packages/abis/Market.json");

	const config = `module.exports = {MarketAddress: "${nftMarketAddress}"};\n`;
	const data = JSON.stringify(config);
	fs.writeFileSync("addresses.js", JSON.parse(data));
	console.log("Addresses exported to ./addresses.js");
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
