const {ethers, upgrades} = require("hardhat");
const fs = require("fs");

async function main() {
	const [deployer] = await ethers.getSigners();

	console.log("Deploying contracts with the account:", deployer.address);

	let txHash, txReceipt;
	const NFTMarket = await ethers.getContractFactory("Market");
	const nftMarket = await upgrades.deployProxy(NFTMarket);
	await nftMarket.deployed();

	txHash = nftMarket.deployTransaction.hash;
	txReceipt = await ethers.provider.waitForTransaction(txHash);
	let nftMarketAddress = txReceipt.contractAddress;

	console.log("Market contract deployed to:", nftMarketAddress);

	let config = `module.exports = {MarketAddress: "${nftMarketAddress}"};\n`;

	let data = JSON.stringify(config);
	fs.writeFileSync("address.js", JSON.parse(data));
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
