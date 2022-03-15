// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./PriceConsumerV3.sol";

import "hardhat/console.sol";

contract Market is ERC721URIStorage, PriceConsumerV3 {
	using Counters for Counters.Counter;
	Counters.Counter private _tokenIds;
	Counters.Counter private _itemsSold;

	uint256 listingPrice = 0.025 ether;
	uint256 resultsPerPage = 12;
	address payable owner;

	mapping(uint256 => MarketItem) private idToMarketItem;

	struct MarketItem {
		uint256 tokenId;
		address creator;
		address payable seller;
		address payable owner;
		uint256 price;
		bool sold;
	}

	event MarketItemCreated(
		uint256 indexed tokenId,
		address creator,
		address seller,
		address owner,
		uint256 price,
		bool sold
	);

	constructor() ERC721("ACN Metaverse Tokens", "ACNT") PriceConsumerV3() {
		owner = payable(msg.sender);
	}

	/* Updates the listing price of the contract */
	function updateListingPrice(uint256 _listingPrice) public payable {
		require(owner == msg.sender, "Only marketplace owner can update listing price.");
		listingPrice = _listingPrice;
	}

	/* Returns the listing price of the contract */
	function getListingPrice() public view returns (uint256) {
		return listingPrice;
	}

	/* Mints a token and lists it in the marketplace */
	function createToken(string memory tokenURI, uint256 price) public payable returns (uint256) {
		_tokenIds.increment();
		uint256 newTokenId = _tokenIds.current();

		_safeMint(msg.sender, newTokenId);
		_setTokenURI(newTokenId, tokenURI);
		createMarketItem(newTokenId, price);
		return newTokenId;
	}

	function createMarketItem(uint256 tokenId, uint256 price) private {
		require(price > 0, "Price must be at least 1 wei");
		require(msg.value == listingPrice, "Price must be equal to listing price");

		idToMarketItem[tokenId] = MarketItem(
			tokenId,
			msg.sender,
			payable(msg.sender),
			payable(address(this)),
			price,
			false
		);

		_transfer(msg.sender, address(this), tokenId);
		emit MarketItemCreated(tokenId, msg.sender, msg.sender, address(this), price, false);
	}

	/* Creates the sale of a marketplace item */
	/* Transfers ownership of the item, as well as funds between parties */
	function createMarketSale(uint256 tokenId) public payable {
		uint256 price = idToMarketItem[tokenId].price;
		address seller = idToMarketItem[tokenId].seller;
		require(
			msg.value == price,
			"Please submit the asking price in order to complete the purchase"
		);
		idToMarketItem[tokenId].owner = payable(msg.sender);
		idToMarketItem[tokenId].sold = true;
		idToMarketItem[tokenId].seller = payable(address(0));
		_itemsSold.increment();
		_transfer(address(this), msg.sender, tokenId);
		payable(owner).transfer(listingPrice);
		payable(seller).transfer(msg.value);
	}

	/* Allows someone to resell a token they have purchased */
	function resellMarketItem(uint256 tokenId, uint256 price) public payable {
		require(
			idToMarketItem[tokenId].owner == msg.sender,
			"Only item owner can perform this operation"
		);
		require(msg.value == listingPrice, "Price must be equal to listing price");
		idToMarketItem[tokenId].sold = false;
		idToMarketItem[tokenId].price = price;
		idToMarketItem[tokenId].seller = payable(msg.sender);
		idToMarketItem[tokenId].owner = payable(address(this));
		_itemsSold.decrement();

		_transfer(msg.sender, address(this), tokenId);
	}

	/* Returns market item by id */
	function fetchMarketItemById(uint256 tokenId) public view returns (MarketItem memory) {
		MarketItem storage item = idToMarketItem[tokenId];
		return item;
	}

	/* Returns all unsold market items */
	function fetchMarketItems() public view returns (MarketItem[] memory) {
		uint256 itemCount = _tokenIds.current();
		uint256 unsoldItemCount = _tokenIds.current() - _itemsSold.current();
		uint256 currentIndex = 0;

		MarketItem[] memory _items = new MarketItem[](unsoldItemCount);
		for (uint256 i = 0; i < itemCount; i++) {
			if (idToMarketItem[i + 1].owner == address(this)) {
				uint256 currentId = i + 1;
				MarketItem storage currentItem = idToMarketItem[currentId];
				_items[currentIndex] = currentItem;
				currentIndex += 1;
			}
		}
		return _items;
	}

	/* Returns all unsold market items paginated */
	function fetchMarketItems(uint256 _page, uint256 _resultsPerPage)
		public
		view
		returns (MarketItem[] memory)
	{
		MarketItem[] memory _data = fetchMarketItems();
		return paginateItems(_data, _page, _resultsPerPage);
	}

	function fetchMarketItems(uint256 _page) public view returns (MarketItem[] memory) {
		return fetchMarketItems(_page, resultsPerPage);
	}

	/* Returns only items that a user has purchased */
	function fetchItemsOwned() public view returns (MarketItem[] memory) {
		uint256 totalItemCount = _tokenIds.current();
		uint256 itemCount = 0;
		uint256 currentIndex = 0;

		for (uint256 i = 0; i < totalItemCount; i++) {
			if (idToMarketItem[i + 1].owner == msg.sender) {
				itemCount += 1;
			}
		}

		MarketItem[] memory _items = new MarketItem[](itemCount);
		for (uint256 i = 0; i < totalItemCount; i++) {
			if (idToMarketItem[i + 1].owner == msg.sender) {
				uint256 currentId = i + 1;
				MarketItem storage currentItem = idToMarketItem[currentId];
				_items[currentIndex] = currentItem;
				currentIndex += 1;
			}
		}
		return _items;
	}

	/* Returns only items that a user has purchased paginated */
	function fetchItemsOwned(uint256 _page, uint256 _resultsPerPage)
		public
		view
		returns (MarketItem[] memory)
	{
		MarketItem[] memory _data = fetchItemsOwned();
		return paginateItems(_data, _page, _resultsPerPage);
	}

	function fetchItemsOwned(uint256 _page) public view returns (MarketItem[] memory) {
		return fetchItemsOwned(_page, resultsPerPage);
	}

	/* Returns only items a user has created */
	function fetchItemsCreated() public view returns (MarketItem[] memory) {
		uint256 totalItemCount = _tokenIds.current();
		uint256 itemCount = 0;
		uint256 currentIndex = 0;

		for (uint256 i = 0; i < totalItemCount; i++) {
			if (idToMarketItem[i + 1].creator == msg.sender) {
				itemCount += 1;
			}
		}

		MarketItem[] memory _items = new MarketItem[](itemCount);
		for (uint256 i = 0; i < totalItemCount; i++) {
			if (idToMarketItem[i + 1].creator == msg.sender) {
				uint256 currentId = i + 1;
				MarketItem storage currentItem = idToMarketItem[currentId];
				_items[currentIndex] = currentItem;
				currentIndex += 1;
			}
		}
		return _items;
	}

	/* Returns only items a user has created paginated */
	function fetchItemsCreated(uint256 _page, uint256 _resultsPerPage)
		public
		view
		returns (MarketItem[] memory)
	{
		MarketItem[] memory _data = fetchItemsCreated();
		return paginateItems(_data, _page, _resultsPerPage);
	}

	function fetchItemsCreated(uint256 _page) public view returns (MarketItem[] memory) {
		return fetchItemsCreated(_page, resultsPerPage);
	}

	/* Returns items paginated */
	function paginateItems(
		MarketItem[] memory data,
		uint256 _page,
		uint256 _resultsPerPage
	) private pure returns (MarketItem[] memory) {
		MarketItem[] memory result = new MarketItem[](_resultsPerPage);
		for (
			uint256 i = _resultsPerPage * _page - _resultsPerPage;
			i < _resultsPerPage * _page;
			i++
		) {
			MarketItem memory currentItem = data[i];
			result[i] = currentItem;
		}
		return result;
	}
}
