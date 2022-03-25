// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol";

import "hardhat/console.sol";

contract MarketUpgradeable is
	Initializable,
	ERC721URIStorageUpgradeable,
	IERC721ReceiverUpgradeable
{
	using StringsUpgradeable for uint256;
	using CountersUpgradeable for CountersUpgradeable.Counter;
	CountersUpgradeable.Counter private _tokenIds;
	CountersUpgradeable.Counter private _itemsSold;

	AggregatorV3Interface internal priceFeed;

	uint256 listingPrice;
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

	event MarketItemUpdated(
		uint256 indexed tokenId,
		address seller,
		address owner,
		uint256 price,
		bool sold
	);

	/**
	 * Initializes the market.
	 */
	function initialize() public initializer {
		__ERC721_init("ACN Metaverse Tokens", "ACNT");
		__ERC721URIStorage_init();
		listingPrice = 0.025 ether;
		owner = payable(msg.sender);
		/**
		 * Network: Polygon Testnet (Mumbai)
		 * Aggregator: MATIC/USD
		 * Address: 0x686c626E48bfC5DC98a30a9992897766fed4Abd3
		 */
		priceFeed = AggregatorV3Interface(0x686c626E48bfC5DC98a30a9992897766fed4Abd3);
	}

	/**
	 * Always returns `IERC721Receiver.onERC721Received.selector`.
	 */
	function onERC721Received(
		address,
		address,
		uint256,
		bytes calldata
	) external virtual override returns (bytes4) {
		return this.onERC721Received.selector;
	}

	/**
	 * Returns the latest price
	 */
	function getLatestPrice() public view returns (uint256) {
		(, int256 price, , , ) = priceFeed.latestRoundData();
		return uint256(price);
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

		_safeMint(msg.sender, newTokenId, "");
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

		_safeTransfer(msg.sender, address(this), tokenId, "");

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

		_safeTransfer(address(this), msg.sender, tokenId, "");

		payable(owner).transfer(listingPrice);
		payable(seller).transfer(msg.value);

		emit MarketItemUpdated(tokenId, seller, msg.sender, price, true);
	}

	/* allows someone to resell a token they have purchased */
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

		_safeTransfer(msg.sender, address(this), tokenId, "");

		emit MarketItemUpdated(tokenId, msg.sender, address(this), price, false);
	}

	/* Returns all unsold market items */
	function fetchMarketItems() public view returns (MarketItem[] memory) {
		uint256 itemCount = _tokenIds.current();
		uint256 unsoldItemCount = _tokenIds.current() - _itemsSold.current();
		uint256 currentIndex = 0;

		MarketItem[] memory items = new MarketItem[](unsoldItemCount);
		for (uint256 i = 0; i < itemCount; i++) {
			if (idToMarketItem[i + 1].owner == address(this)) {
				uint256 currentId = i + 1;
				MarketItem storage currentItem = idToMarketItem[currentId];
				items[currentIndex] = currentItem;
				currentIndex += 1;
			}
		}
		return items;
	}

	function fetchMarketItemById(uint256 tokenId) public view returns (MarketItem memory) {
		MarketItem storage item = idToMarketItem[tokenId];
		return item;
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
		uint256 totalItemCount = _tokenIds.current();
		uint256 itemCount = 0;
		uint256 currentIndex = 0;

		for (uint256 i = 0; i < totalItemCount; i++) {
			if (idToMarketItem[i + 1].creator == msg.sender) {
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
