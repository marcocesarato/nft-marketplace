// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "hardhat/console.sol";
import "./PriceConsumerV3.sol";
import "./NFT.sol";

contract Market is ReentrancyGuard, PriceConsumerV3 {
	using Counters for Counters.Counter;
	Counters.Counter private _itemIds;
	Counters.Counter private _itemsSold;

	address payable owner;
	uint256 listingPrice = 0.025 ether;

	constructor() PriceConsumerV3() {
		owner = payable(msg.sender);
	}

	struct MarketItem {
		uint256 itemId;
		address nftContract;
		uint256 tokenId;
		address payable seller;
		address payable owner;
		address creator;
		uint256 price;
	}

	mapping(uint256 => MarketItem) private idToMarketItem;

	event MarketItemCreated(
		uint256 indexed itemId,
		address indexed nftContract,
		uint256 indexed tokenId,
		address seller,
		address owner,
		address creator,
		uint256 price
	);

	event ProductListed(uint256 indexed itemId);

	modifier onlyItemOwner(uint256 id) {
		require(idToMarketItem[id].owner == msg.sender, "Only product owner can do this operation");
		_;
	}

	/* Updates the listing price of the contract */
	function updateListingPrice(uint256 _listingPrice) public payable {
		require(owner == msg.sender, "Only marketplace owner can update listing price");
		listingPrice = _listingPrice;
	}

	/* Returns the listing price of the contract */
	function getListingPrice() public view returns (uint256) {
		return listingPrice;
	}

	function createMarketItem(
		address nftContract,
		uint256 tokenId,
		uint256 price
	) public payable nonReentrant {
		require(price > 0, "Price must be greater than 0");
		require(msg.value == listingPrice, "Price must be equal to listing price");

		_itemIds.increment();
		uint256 itemId = _itemIds.current();

		idToMarketItem[itemId] = MarketItem(
			itemId,
			nftContract,
			tokenId,
			payable(msg.sender),
			payable(address(0)),
			msg.sender,
			price
		);

		IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

		emit MarketItemCreated(
			itemId,
			nftContract,
			tokenId,
			msg.sender,
			address(0),
			msg.sender,
			price
		);
	}

	function createMarketSale(address nftContract, uint256 itemId) public payable nonReentrant {
		uint256 price = idToMarketItem[itemId].price;
		uint256 tokenId = idToMarketItem[itemId].tokenId;
		require(
			msg.value == price,
			"Please submit the asking price in order to complete the purchase"
		);

		idToMarketItem[itemId].seller.transfer(msg.value);
		IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
		idToMarketItem[itemId].owner = payable(msg.sender);
		_itemsSold.increment();
		payable(owner).transfer(listingPrice);

		emit ProductListed(itemId);
	}

	/* Allows someone to resell a token they have purchased */
	function resaleMarketItem(
		address nftContract,
		uint256 itemId,
		uint256 newPrice
	) public payable nonReentrant onlyItemOwner(itemId) {
		uint256 tokenId = idToMarketItem[itemId].tokenId;
		require(newPrice > 0, "Price must be at least 1 wei");
		require(msg.value == listingPrice, "Price must be equal to listing price");

		NFT tokenContract = NFT(nftContract);
		tokenContract.transferToken(msg.sender, address(this), tokenId);

		address oldOwner = idToMarketItem[itemId].owner;
		idToMarketItem[itemId].owner = payable(address(0));
		idToMarketItem[itemId].seller = payable(oldOwner);
		idToMarketItem[itemId].price = newPrice;
		_itemsSold.decrement();

		emit ProductListed(itemId);
	}

	function fetchMarketItemById(uint256 ItemId) public view returns (MarketItem memory) {
		MarketItem storage item = idToMarketItem[ItemId];
		return item;
	}

	function fetchMarketItems() public view returns (MarketItem[] memory) {
		uint256 itemCount = _itemIds.current();
		uint256 unsoldItemCount = _itemIds.current() - _itemsSold.current();
		uint256 currentIndex = 0;

		MarketItem[] memory items = new MarketItem[](unsoldItemCount);
		for (uint256 i = 0; i < itemCount; i++) {
			if (idToMarketItem[i + 1].owner == address(0)) {
				uint256 currentId = i + 1;
				MarketItem storage currentItem = idToMarketItem[currentId];
				items[currentIndex] = currentItem;
				currentIndex += 1;
			}
		}
		return items;
	}

	/* Returns only items that a user has purchased */
	function fetchItemsOwned() public view returns (MarketItem[] memory) {
		uint256 totalItemCount = _itemIds.current();
		uint256 itemCount = 0;
		uint256 currentIndex = 0;

		for (uint256 i = 0; i < totalItemCount; i++) {
			if (idToMarketItem[i + 1].owner == msg.sender) {
				itemCount += 1;
			}
		}

		MarketItem[] memory items = new MarketItem[](itemCount);
		for (uint256 i = 0; i < totalItemCount; i++) {
			if (idToMarketItem[i + 1].owner == msg.sender) {
				uint256 currentId = i + 1;
				MarketItem storage currentItem = idToMarketItem[currentId];
				items[currentIndex] = currentItem;
				currentIndex += 1;
			}
		}
		return items;
	}

	/* Returns only items a user has created */
	function fetchItemsCreated() public view returns (MarketItem[] memory) {
		uint256 totalItemCount = _itemIds.current();
		uint256 itemCount = 0;
		uint256 currentIndex = 0;

		for (uint256 i = 0; i < totalItemCount; i++) {
			if (idToMarketItem[i + 1].seller == msg.sender) {
				itemCount += 1;
			}
		}

		MarketItem[] memory items = new MarketItem[](itemCount);
		for (uint256 i = 0; i < totalItemCount; i++) {
			if (idToMarketItem[i + 1].creator == msg.sender) {
				uint256 currentId = i + 1;
				MarketItem storage currentItem = idToMarketItem[currentId];
				items[currentIndex] = currentItem;
				currentIndex += 1;
			}
		}
		return items;
	}
}
