export type NFT = {
	token_address: string;
	token_id: string;
	contract_type: string;
	owner_of: string;
	block_number: string;
	block_number_minted: string;
	token_uri?: string | null | undefined;
	metadata?: NFTMetadata | string | null | undefined;
	synced_at?: string | undefined;
	amount?: string | null | undefined;
	name: string;
	symbol: string;
};

export type NFTMetadata = {
	name: string;
	description: string;
	image: string;
	data: NFTMetadata;
};

export type NFTMarketItem = {
	price: float;
	tokenId: int;
	seller: string;
	sold: boolean;
	owner: string;
	creator?: string;
	image: string;
	name: string;
	description: string;
};

export type MarketTransfers = {
	transaction_hash: string;
	address: string;
	block_timestamp: string;
	block_number: string;
	block_hash: string;
	to_address: string;
	from_address: string;
	value: string;
};
