export type TokenItem = MarketTokenItem & NativeTokenItem;

export type NativeTokenItem = {
	token_address: string;
	token_id: string;
	contract_type?: string | null;
	owner_of?: string | null;
	block_number?: string | null;
	block_number_minted?: string | null;
	token_uri?: string | null;
	name?: string | null;
	amount?: string | null;
	symbol?: string | null;
	token_hash?: string | null;
	last_token_uri_sync?: string | null;
	last_metadata_sync?: string | null;
	description?: string | null;
	image?: string | null;
	thumbnail?: string | null;
	attributes?: any | null;
	external_url?: string | null;
	animation_url?: string | null;
	youtube_url?: string | null;
};

export type MarketTokenItem = {
	_id: string | null;
	name: string | null;
	network_id: number | null;
	token_id: number | null;
	token_address: string | null;
	token_uri: string | null;
	creator: string | null;
	seller: string | null;
	owner_of: string | null;
	price: string | null;
	price_formatted?: number | null;
	sold: boolean | null;
	description: string | null;
	external_url?: string | null;
	animation_url?: string | null;
	youtube_url?: string | null;
	image: string;
	thumbnail?: string | null;
	likes?: number | null;
	is_liked?: boolean | null;
	is_favourited?: boolean | null;
	updated_at?: any | null;
	created_at?: any | null;
	attributes?: Array<TokenAttribute | null> | null;
};

export type TokenTransfer = {
	token_address: string;
	token_id: string;
	from_address: string;
	to_address: string;
	value?: string | null;
	amount?: string | null;
	contract_type?: string | null;
	block_number?: string | null;
	block_timestamp?: string | null;
	block_hash?: string | null;
	transaction_hash?: string | null;
	transaction_type?: string | null;
	transaction_index?: number | null;
	log_index?: number | null;
	operator?: string | null;
};

type TokenAttribute = {
	trait_type: string;
	value: string;
	display_type?: string | null;
};
