/**
 * Upgrade smart contracts yet deployed on blockchain
 */
const {ethers, upgrades} = require("hardhat");
const fs = require("fs");
const {dotenvLoad} = require("dotenv-mono");

dotenvLoad();

const main = async () => {
	const [deployer] = await ethers.getSigners();

	const addresses = getAddresses();

	console.log("Upgrading contracts with the account:", deployer.address);
	console.log("Upgrading NFTMarket to address:", addresses.MarketAddress);

	const NFTMarket = await ethers.getContractFactory("MarketUpgradeable");
	const nftMarket = await upgrades.upgradeProxy(addresses.MarketAddress, NFTMarket);
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
};

const getAddresses = () => {
	let addresses;
	try {
		addresses = JSON.parse(process.env.NEXT_PUBLIC_CHAIN_ADDRESSES);
		if (!addresses.MarketAddress) {
			throw new Error(
				"Invalid NEXT_PUBLIC_CHAIN_ADDRESSES.MarketAddress environment variable",
			);
		}
	} catch (e) {
		throw new Error("Can't parse chain contract addresses", e.message);
	}
	return addresses;
};

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
