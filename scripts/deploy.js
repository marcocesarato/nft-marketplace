const hre = require("hardhat");
const fs = require("fs");

async function main() {
	const [deployer] = await hre.ethers.getSigners();

	console.log("Deploying contracts with the account:", deployer.address);

	let txHash, txReceipt;
	const NFTMarket = await hre.ethers.getContractFactory("Market");
	const nftMarket = await NFTMarket.deploy();
	await nftMarket.deployed();

	txHash = nftMarket.deployTransaction.hash;
	txReceipt = await ethers.provider.waitForTransaction(txHash);
	let nftMarketAddress = txReceipt.contractAddress;

	console.log("Market contract deployed to:", nftMarketAddress);

	let config = `export const MarketAddress = "${nftMarketAddress}";\n`;

	let data = JSON.stringify(config);
	fs.writeFileSync("src/configs/deploys.ts", JSON.parse(data));
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
