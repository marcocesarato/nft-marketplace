// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract PriceConsumerV3 {
	AggregatorV3Interface internal priceFeed;

	/**
	 * Network: Polygon Testnet (Mumbai)
	 * Aggregator: MATIC/USD
	 * Address: 0x686c626E48bfC5DC98a30a9992897766fed4Abd3
	 */
	constructor() {
		priceFeed = AggregatorV3Interface(0x686c626E48bfC5DC98a30a9992897766fed4Abd3);
	}

	/**
	 * Returns the latest price
	 */
	function getLatestPrice() public view returns (uint256) {
		(, int256 price, , , ) = priceFeed.latestRoundData();
		return uint256(price);
	}
}
