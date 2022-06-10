export type TokenItem = {
	token_address: string;
	token_id: string;
	contract_type: string;
	owner_of: string;
	block_number: string;
	block_number_minted: string;
	token_uri?: string | null | undefined;
	metadata?: TokenMetadata | null | undefined;
	synced_at?: string | undefined;
	image?: string | undefined;
	amount?: string | null | undefined;
	name: string;
	symbol: string;
};

export type TokenMetadata = {
	name: string;
	description: string;
	image: string;
	thumbnail: string;
	externalUrl?: string;
	attributes?: [ItemAttribute];
	data?: TokenMetadata;
};

export interface TokenMarketItem extends TokenMetadata {
	price: float;
	tokenId: int;
	sold: boolean;
	owner: string;
	creator?: string;
	seller: string;
}

export type TokenTransfer = {
	transaction_hash: string;
	address: string;
	block_timestamp: string;
	block_number: string;
	block_hash: string;
	to_address: string;
	from_address: string;
	value: string;
};

type ItemAttribute = {
	trait_type: string;
	value: string;
	display_type?: string | null | undefined;
};
